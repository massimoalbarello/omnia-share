import { useCallback, useEffect, useRef, useState } from "react";

import { Peer, DataConnection, MediaConnection } from "peerjs";
import { QRCodeCanvas } from "qrcode.react";

const ReceiverPage = () => {
  const [receiverPeer, setReceiverPeer] = useState<Peer>(new Peer());
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<any>();

  const initDataConnection = useCallback((dataConnection: DataConnection) => {
    dataConnection.on("open", () => {
      console.log("Established data connection");
      dataConnection.send("Pong");
    });

    dataConnection.on("data", (data) => {
      console.log(data);
    });

    dataConnection.on("error", (error) => {
      backToHomePage();
      console.log("Data connection error: ", error);
    });

    dataConnection.on("close", () => {
      backToHomePage();
      console.log("Data connection closed");
    });

    setIsConnected(true);
  }, []);

  const initMediaConnection = useCallback(
    (mediaConnection: MediaConnection) => {
      mediaConnection.answer();

      mediaConnection.on("stream", (remoteStream) => {
        console.log("Received remote stream");
        if (videoRef?.current) {
          videoRef.current.srcObject = remoteStream;
        }
      });

      mediaConnection.on("error", (error) => {
        backToHomePage();
        console.log("Media connection error: ", error);
      });

      mediaConnection.on("close", () => {
        backToHomePage();
        console.log("Media connection closed");
      });
    },
    []
  );

  useEffect(() => {
    receiverPeer.on("open", function (id) {
      console.log("Connected to signaling server. My peer ID is: " + id);
    });

    receiverPeer.on("connection", (dataConnection) => {
      console.log("Received data connection");
      initDataConnection(dataConnection);
    });

    receiverPeer.on("call", (mediaConnection) => {
      console.log("Received media connection");
      initMediaConnection(mediaConnection);
    });

    receiverPeer.on("error", (error) => {
      backToHomePage();
      console.log("Peer error: ", error);
    });

    receiverPeer.on("disconnected", () => {
      console.log("Disconnected from signaling server");
      // reconnect to signaling server in order to create new connections
      receiverPeer.reconnect();
    });

    receiverPeer.on("close", () => {
      console.log("Local peer destroyed");
      // initialize new peer
      setReceiverPeer(new Peer());
    });
  }, [receiverPeer, initDataConnection, initMediaConnection]);

  const backToHomePage = () => {
    setIsConnected(false);
  };

  return (
    <div className="w-full bg-white p-4">
      <p className="text-black">Receiver</p>

      {receiverPeer.id && !isConnected && (
        <QRCodeCanvas value={receiverPeer.id} size={256} />
      )}

      {isConnected && (
        <video ref={videoRef} autoPlay muted playsInline width="100%"></video>
      )}
    </div>
  );
};

export default ReceiverPage;
