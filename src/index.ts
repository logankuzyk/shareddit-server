import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import fs from 'fs';
import http from 'http';
import https from 'https';
import * as corsProxy from './corsProxy';

const dotenv = require('dotenv').config();

// Start the server
const port = Number(4000);
http.createServer(app).listen(port);

corsProxy.start();
