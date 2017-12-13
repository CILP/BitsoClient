const Rx = require('rxjs/Rx');

const wsClient = (options = {}) => {
  /* options: {
    url: '',
    protocols: ''
  } */

  if (WebSocket) {
    return new WebSocket(options.url, options.protocols);
  }

  const send = (data) => {
    return Rx.Observable.create(observer => {

    });
  };
  
};

function ws(url, protocols) {

  if (!WebSocket && !url) {
    return;
  }

  const ws = new WebSocket(url, protocols);

  function error(fn) {
    ws.onerror = function(event) {
      fn();
    };
  }

  ws.onopen = function(event) {
    // Successfull connection to WS server
  }

  ws.onerror = function(event) {
    // Error with the connection
  }

  ws.onmessage = function(event) {

  }

  function send(message) {
    ws.send(message);
  }

  function close(code, reason) {
    ws.close(code, reason);
  }
}



