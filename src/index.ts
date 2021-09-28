import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import fs from 'fs';
import http from 'http';
import https from 'https';
import * as corsProxy from './corsProxy';

const dotenv = require('dotenv').config();

// Start the server
const port = 4000;
http.createServer(app).listen(port, '0.0.0.0', () => {
  console.log(`shareddit server started on port ${port}`);
});

corsProxy.start();
