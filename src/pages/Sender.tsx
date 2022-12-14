import { useCallback, useEffect, useState } from "react";
import { Peer, DataConnection, MediaConnection } from "peerjs";
import QrReader from "react-qr-scanner";
import { isMobile, isSafari } from 'react-device-detect';
import ReactGA from "react-ga4";
import Button from "../components/Button/Button";
import { ROUTES } from "../constants/routes";
import ParagraphsContainer from "../components/ParagraphsContainer/ParagraphsContainer";
import { SENDER_MOBILE_ERROR, SENDER_SAFARI_WARNING } from "../constants/texts";

const SenderPage = () => {
  const [senderPeer, setSenderPeer] = useState<Peer>(new Peer());
  const [senderPeerId, setSenderPeerId] = useState("");
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [dataConnection, setDataConnection] = useState<DataConnection>();
  const [mediaConnection, setMediaConnection] = useState<MediaConnection>();
  const [isScannerEnabled, setIsScannerEnabled] = useState(false);

  const backToHomePage = useCallback(() => {
    setIsSharing(false);
    setIsScanCompleted(false);
    setIsScannerEnabled(false);
  }, []);

  const initDataConnection = useCallback(
    (remotePeerId: string) => {
      const dataConn = senderPeer.connect(remotePeerId);

      dataConn.on("open", () => {
        console.log("Established data connection");
        dataConn.send("Ping");
      });

      dataConn.on("data", (data) => {
        console.log(data);
      });

      dataConn.on("error", (error) => {
        backToHomePage();
        console.log("Data connection error: ", error);
      });

      dataConn.on("close", () => {
        backToHomePage();
        console.log("Data connection closed");
      });

      setDataConnection(dataConn);
    },
    [senderPeer, backToHomePage]
  );

  const initMediaConnection = useCallback(
    async (remotePeerId: string) => {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      console.log("Captured media stream");

      const mediaConn = senderPeer.call(remotePeerId, stream);
      console.log("Established media connection");
      setIsSharing(true);

      mediaConn.on("error", (error) => {
        backToHomePage();
        console.log("Media connection error: ", error);
      });

      mediaConn.on("close", () => {
        backToHomePage();
        console.log("Media connection closed");
      });

      setMediaConnection(mediaConn);
    },
    [senderPeer, backToHomePage]
  );

  const handleScan = useCallback(
    async (res: { text: string }) => {
      if (res && !isScanCompleted) {

        const pathPieces = res.text.split(ROUTES.SCREEN_SHARING_SENDER.path + '/');

        if (!pathPieces[1]) {
          console.log('QR code is invalid: no receiver id found');
          return;
        }

        const remotePeerId = pathPieces[1];
        console.log("Peer receiver id: ", remotePeerId);

        setIsScanCompleted(true);

        // log analytics
        ReactGA.event('scan_completed');

        initDataConnection(remotePeerId);

        await initMediaConnection(remotePeerId);
      }
    },
    [isScanCompleted, initDataConnection, initMediaConnection]
  );

  const handleError = (error: Error) => {
    console.log("Scan error", error);
  };

  const stopSharing = () => {
    if (dataConnection && mediaConnection) {
      dataConnection.close();
      mediaConnection.close();
      console.log("Stopped sharing");
    }
  };

  const toggleScanner = () => {
    if (!isScannerEnabled) {
      // log analytics
      ReactGA.event('scan_started');
    } else {
      // log analytics
      ReactGA.event('scan_stopped');
    }

    setIsScannerEnabled((prev) => !prev);
  };

  useEffect(() => {
    senderPeer.on("open", (id) => {
      console.log("Connected to signaling server. My peer ID is: " + id);
      setSenderPeerId(id);
    });

    senderPeer.on("connection", () => {
      console.log("Connected to remote peer");
    });

    senderPeer.on("error", (error) => {
      backToHomePage();
      console.log("Peer error: ", error);
    });

    senderPeer.on("disconnected", () => {
      console.log("Disconnected from signaling server");
      // reconnect to signaling server in order to create new connections
      senderPeer.reconnect();
    });

    senderPeer.on("close", () => {
      console.log("Local peer destroyed");
      // initialize new peer
      setSenderPeer(new Peer());
    });
  }, [senderPeer, backToHomePage]);

  if (isMobile) {
    return (
      <div className="text-center relative p-3 z-20 bg-black border border-white rounded pb-9">
        <ParagraphsContainer paragraphs={SENDER_MOBILE_ERROR} />
      </div>
    );
  }

  return (
    <div className="text-center relative p-3 z-20 bg-black border border-white rounded">
      <h1 className="text-2xl font-bold">Sender</h1>
      <h2 className="text-xs">ID: {senderPeerId}</h2>
      {isSharing ? (
        <Button className="mt-3" onClick={stopSharing}>
          Stop sharing
        </Button>
      ) : (
        <div>
          {isScannerEnabled && !isScanCompleted && (
            <QrReader
              onError={handleError}
              onScan={handleScan}
              style={{
                minWidth: "95%",
                height: "auto",
                maxHeight: 400,
                marginTop: 20,
                marginRight: "auto",
                marginBottom: 20,
                marginLeft: "auto",
              }}
            />
          )}
          <Button className="mt-3" onClick={toggleScanner}>
            {isScannerEnabled ? "Stop scanner" : "Scan receiver QR code"}
          </Button>
          {isSafari && <ParagraphsContainer paragraphs={SENDER_SAFARI_WARNING} />}
        </div>
      )}
    </div>
  );
};

export default SenderPage;
