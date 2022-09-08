import React, { useCallback, useEffect, useState } from 'react';
import { Peer } from 'peerjs';
import QrReader from 'react-qr-scanner';

export interface ISenderPageProps { };

const SenderPage: React.FunctionComponent<ISenderPageProps> = (props) => {

    const [senderPeer, setSenderPeer] = useState<Peer>();
    const [isScanCompleted, setIsScanCompleted] = useState(false);

    const handleError = (error: Error) => {
        console.log("Scan error", error);
    };

    const handleScan = useCallback(async (res: {text: string, timestamp: number}) => {
        if (res && !isScanCompleted) {
            console.log("Peer receiver id:", res);

            if (senderPeer) {
                const conn = senderPeer.connect(res.text);

                setIsScanCompleted(true);
    
                conn.on("open", () => {
                    console.log("Connected to receiver");
                    conn.send("hi!");
                });
                conn.on("data", (data) => {
                    console.log(data);
                });
    
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

                console.log("MediaStream", stream);
    
                const mediaConn = senderPeer.call('receiver', stream);
    
                mediaConn.on('error', console.log);
            }
        }
    }, [isScanCompleted, senderPeer]);

    useEffect(() => {
        const peer: Peer = new Peer();
        peer.on('open', async function (id) {
            console.log('My peer ID is: ' + id);

            setSenderPeer(peer);
        });
    }, []);

    return (
        <div>
            <p>Sender</p>
            {!isScanCompleted && <QrReader
                onError={handleError}
                onScan={handleScan}
            />}
        </div>
    );
}

export default SenderPage;