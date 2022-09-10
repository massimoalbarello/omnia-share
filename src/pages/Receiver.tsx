import React, { useEffect, useRef, useState } from 'react';

import { Peer } from 'peerjs';
import { QRCodeCanvas } from 'qrcode.react';

export interface IReceiverPageProps { };

const ReceiverPage: React.FunctionComponent<IReceiverPageProps> = (props) => {

    const videoRef = useRef<any>();
    const [peerId, setPeerId] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const peer: Peer = new Peer();

        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            setPeerId(id);
        });

        peer.on("connection", (dataConnection) => {
            setIsConnected(true);

            dataConnection.on("data", (data) => {
                console.log(data);
            });

            dataConnection.on("open", () => {
                console.log("Connected to sender");
                dataConnection.send("Pong");
            });

            dataConnection.on("close", () => {
                backToHomePage();
                console.log("Data connection closed");
            });
        });

        peer.on("call", (mediaConnection) => {

            console.log("Received call");
            mediaConnection.answer();

            mediaConnection.on('stream', (remoteStream) => {
                console.log("Received remote stream");
                if (videoRef?.current) {
                    videoRef.current.srcObject = remoteStream;
                }
            });

            mediaConnection.on("close", () => {
                backToHomePage();
                console.log("Media connection closed");
            });
        });

        function backToHomePage() {
            setIsConnected(false);
        }

    }, []);
    return (
        <div>
            <p>Receiver</p>

            {(peerId && !isConnected) && <QRCodeCanvas value={peerId} size={256} />}

            {isConnected && <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                width="100%"
            ></video>}
        </div>
    )
}

export default ReceiverPage;