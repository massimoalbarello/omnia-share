const { PeerServer } = require('peer');

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const peerServer = PeerServer({
  port: 9000,
  path: '/myapp',
  generateClientId: customGenerationFunction
});

peerServer.on('connection', (client) => {
    console.log(client.id + " connected");
});

peerServer.on('disconnect', (client) => {
    console.log(client.id + " disconnected");
});

