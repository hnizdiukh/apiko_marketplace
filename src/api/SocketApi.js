import socket from 'socket.io-client';

class SocketApi {
  init(token) {
    this.socket = socket('https://apiko-intensive-backend.herokuapp.com/', {
      query: {
        token
      },
      transports: [ 'websocket' ]
    });

    this.socket.on('connect', () => {
      console.log('connected');
    });
  }

  handleMessages(handler) {
    this.socket.on('message', (message) => console.log(JSON.parse(message)));
    this.socket.on('message', (message) => handler(JSON.parse(message)));
  }
}

export default new SocketApi();
