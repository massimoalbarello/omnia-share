import React, { useEffect } from 'react';

import { Peer } from 'peerjs';

export interface ISenderPageProps {};

const SenderPage: React.FunctionComponent<ISenderPageProps> = (props) => {
    useEffect(() => {
        const peer: Peer = new Peer({
            host: "omnia-share.oa.r.appspot.com",
            port: 80,
            path: "/omnia-share"
        });
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        
            const conn = peer.connect("receiver");
            
            conn.on("open", () => {
                console.log("Connected to receiver");
                conn.send("hi!");
            });
            conn.on("data", (data) => {
                console.log(data);
            });

        });
        
    }, []);
    return (
        <div>
            <p>Sender</p>
        </div>
    )
}

export default SenderPage;