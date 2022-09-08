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

        peer.on("connection", (conn) => {
            setIsConnected(true);
            
            console.log("Connected");

            conn.on("data", (data) => {
                console.log(data);
            });

            conn.on("open", () => {
                conn.send("hello!");
            });
        });

        peer.on("call", (call) => {

            console.log("received call");

            call.answer();

            call.on('stream', (remoteStream) => {

                console.log("received stream", remoteStream);

                if (videoRef?.current) {
                    videoRef.current.srcObject = remoteStream;
                }

            });
        });
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