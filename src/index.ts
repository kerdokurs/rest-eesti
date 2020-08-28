import express from 'express';
import morgan from 'morgan';

import 'dotenv/config';

import v1 from './v1';
import prisma from './v1/prisma';
import { errorHandler } from './v1/middleware/errorHandler';
import { forceHTTPS } from './v1/middleware/forceHTTPS';

const app = express();

app.use(forceHTTPS);

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/v1', v1);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on %s!', port));

process.on('exit', () => {
  prisma.$disconnect();
});
