import React, { useEffect } from 'react';

import { Peer } from 'peerjs';

export interface IReceiverPageProps {};

const ReceiverPage: React.FunctionComponent<IReceiverPageProps> = (props) => {
    useEffect(() => {
        const peer: Peer = new Peer("receiver", {
            host: 'localhost',
            port: 9000,
            path: '/myapp'
          });
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });
        peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                console.log(data);
            });
            conn.on("open", () => {
                conn.send("hello!");
            });
        });
    }, []);
    return (
        <div>
            <p>Receiver</p>
        </div>
    )
}

export default ReceiverPage;