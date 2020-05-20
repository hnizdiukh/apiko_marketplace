import socket from 'socket.io-client';

class SocketApi {
  init(token) {
    this.socket = socket('https://apiko-marketplace-api-2019.herokuapp.com/', {
      query: {
        token
      },
      transports: [ 'websocket' ]
    });

    this.socket.on('connect', () => {
      console.log('connected', { socket });
    });
  }

  handleMessages(handler) {
    this.socket.on('message', (message) => handler(JSON.parse(message)));
  }
}

export default new SocketApi();
