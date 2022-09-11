import { useCallback, useEffect, useState } from "react";
import { Peer, DataConnection, MediaConnection } from "peerjs";
import QrReader from "react-qr-scanner";

const SenderPage = () => {
  const [senderPeer, setSenderPeer] = useState<Peer>(new Peer());
  const [isScanCompleted, setIsScanCompleted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [dataConnection, setDataConnection] = useState<DataConnection>();
  const [mediaConnection, setMediaConnection] = useState<MediaConnection>();

  const backToHomePage = useCallback(() => {
    setIsSharing(false);
    setIsScanCompleted(false);
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
        const remotePeerId: string = res.text;
        console.log("Peer receiver id: ", remotePeerId);
        setIsScanCompleted(true);

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

  useEffect(() => {
    senderPeer.on("open", (id) => {
      console.log("Connected to signaling server. My peer ID is: " + id);
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

  return (
    <div>
      <p>Sender</p>
      {!isScanCompleted && (
        <QrReader onError={handleError} onScan={handleScan} />
      )}
      {isSharing && <button onClick={stopSharing}>Stop sharing</button>}
    </div>
  );
};

export default SenderPage;
