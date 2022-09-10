import React, { useCallback, useEffect, useState } from 'react';
import { Peer, DataConnection, MediaConnection } from 'peerjs';
import QrReader from 'react-qr-scanner';

export interface ISenderPageProps { };

const SenderPage: React.FunctionComponent<ISenderPageProps> = (props) => {

    const [senderPeer, setSenderPeer] = useState<Peer>();
    const [isScanCompleted, setIsScanCompleted] = useState(false);
    const [dataConnection, setDataConnection] = useState<DataConnection>();
    const [mediaConnection, setMediaConnection] = useState<MediaConnection>();
    const [isSharing, setIsSharing] = useState(false);

    
    useEffect(() => {
        const peer: Peer = new Peer();
        peer.on('open', async function (id) {
            console.log('My peer ID is: ' + id);
            setSenderPeer(peer);
        });
    }, []);

    const handleScan = useCallback(async (res: {text: string}) => {
        if (res && !isScanCompleted) {
            console.log("Peer receiver id:", res);
            setIsScanCompleted(true);

            if (senderPeer) {
                const dataConn = senderPeer.connect(res.text);    

                dataConn.on("open", () => {
                    console.log("Connected to receiver");
                    dataConn.send("Ping");
                });

                dataConn.on("data", (data) => {
                    console.log(data);
                });

                dataConn.on("close", () => {
                    backToHomePage();
                    console.log("Data connection closed");
                });

                setDataConnection(dataConn);
    
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
                console.log("Captured media stream");
    
                const mediaConn = senderPeer.call(res.text, stream);
                setIsSharing(true);

                mediaConn.on("error", () => {
                    backToHomePage();
                    console.log("Media connection error");
                })

                mediaConn.on("close", () => {
                    backToHomePage();
                    console.log("Media connection closed");
                });

                setMediaConnection(mediaConn);          
            }
        }
    }, [isScanCompleted, senderPeer]);

    const handleError = (error: Error) => {
        console.log("Scan error", error);
    };

    function stopSharing() {
        if (dataConnection && mediaConnection) {
            dataConnection.close();
            mediaConnection.close();
            console.log("Stopped sharing");
        }
    }

    function backToHomePage() {
        setIsSharing(false);
        setIsScanCompleted(false);
    }

    return (
        <div>
            <p>Sender</p>
            {!isScanCompleted && <QrReader
                onError={handleError}
                onScan={handleScan}
            />}
            {isSharing && <button onClick={stopSharing}>Stop sharing</button>}
        </div>
    );
}

export default SenderPage;