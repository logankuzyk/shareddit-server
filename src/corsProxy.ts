import fs from 'fs';

const corsProxy = require('cors-anywhere');

export function start(): void {
  corsProxy
    .createServer({
      originWhitelist: [],
      requireHeader: [],
      removeHeaders: [
        'cookie1',
        'cookie2',
        'x-request-start',
        'x-request-id',
        'via',
        'connect-time',
        'total-route-time',
      ],
      redirectSameOrigin: true,
      httpProxyOptions: {
        xfwd: true,
      },
    })
    .listen(6000, '0.0.0.0', console.log('CORS Anywhere started'));
}
