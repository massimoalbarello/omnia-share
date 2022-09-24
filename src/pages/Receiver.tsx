import { useCallback, useEffect, useRef, useState } from "react";

import { Peer, DataConnection, MediaConnection } from "peerjs";
import { QRCodeCanvas } from "qrcode.react";
import Container from "../components/Container/Container";
import { useQueryParams } from "../hooks/useQueryParams";
import { PATH_REDIRECTION_ON_PHONE_SCAN } from "../constants/routes";

const ReceiverPage = () => {
  const [receiverPeer, setReceiverPeer] = useState<Peer>(new Peer());
  const [isConnectedToSignalingServer, setIsConnectedToSignalingServer] =
    useState(false);
  const [isConnectedToPeer, setIsConnectedToPeer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const params = useQueryParams();
  const qrSize = parseInt(params.get("qrSize") || "256");

  const backToHomePage = useCallback(() => {
    setIsConnectedToPeer(false);
  }, []);

  const initDataConnection = useCallback(
    (dataConnection: DataConnection) => {
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

      setIsConnectedToPeer(true);
    },
    [backToHomePage]
  );

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
    [videoRef, backToHomePage]
  );

  useEffect(() => {
    receiverPeer.on("open", function (id) {
      console.log("Connected to signaling server. My peer ID is: " + id);
      setIsConnectedToSignalingServer(true);
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
      setIsConnectedToSignalingServer(false);
      // initialize new peer
      setReceiverPeer(new Peer());
    });
  }, [receiverPeer, initDataConnection, initMediaConnection, backToHomePage]);

  if (isConnectedToPeer) {
    return (
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="100%"
        style={{ maxHeight: "100%" }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        Waiting for Sender to start the stream...
      </video>
    );
  }

  return (
    <Container className="mt-2 lg:mt-8">
      <div className="text-center relative p-3 z-20 bg-black border border-white rounded">
        <h1 className="text-3xl font-bold">Receiver</h1>
        {isConnectedToSignalingServer && (
          <h2 className="text-xs">ID: {receiverPeer.id}</h2>
        )}

        {isConnectedToSignalingServer && (
          <div className="w-full mx-auto mt-3 bg-white text-black p-6 rounded">
            <QRCodeCanvas
              value={
                "https://omnia-iot.com/#" +
                PATH_REDIRECTION_ON_PHONE_SCAN +
                receiverPeer.id
              }
              size={qrSize}
              className="mx-auto"
            />
            <h2 className="mt-3 font-bold text-2xl">
              Scan this QR code with Sender scanner
            </h2>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ReceiverPage;
