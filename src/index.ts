import './pre-start'; // Must be the first import
import app from '@server';
import http from 'http';
import * as corsProxy from './corsProxy';

require('dotenv').config();

// Start the server
const port = 4000;
http.createServer(app).listen(port, '0.0.0.0', () => {
  console.log(`shareddit server started on port ${port}`);
});

corsProxy.start();
