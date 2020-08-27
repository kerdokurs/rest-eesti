import express from 'express';
import morgan from 'morgan';

import 'dotenv/config';

import v1 from './v1';
import prisma from './v1/prisma';
import { errorHandler } from './v1/middleware/errorHandler';

const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/v1', v1);

app.use(errorHandler);

/* app.get('/', async (req, res) => {
  const maakonnad = await prisma.maakond.findMany({
    orderBy: {
      nimi: 'asc',
    },
    select: {
      id: true,
      nimi: true,
      pindala: true,
      rahvaarv: true,
      keskus: {
        select: {
          id: true,
          nimi: true,
          rahvaarv: true,
        },
      },
    },
  });

  res.json(maakonnad);
});

interface FetchParams {
  select?: object;
  take: number;
  orderBy: object;
}

const routes: any = { maakonnad: 'maakond', linnad: 'linn' };

const DEFAULT_LIMIT = 5;

app.get('/get/:route', async (req, res) => {
  try {
    const { route } = req.params;

    if (Object.keys(routes).indexOf(req.params.route) === -1)
      throw new Error('Invalid route');

    console.log(route);

    const { fields, limit, order } = req.query as URLQuery;

    const select: any = {};
    for (let field of (fields || '').split(',')) select[field] = true;

    const take =
      limit && typeof limit === 'string' ? parseInt(limit) : DEFAULT_LIMIT;

    const orderBy: any = {};

    if (order) {
      const splitted = order.split(',');
      const orderIndex = splitted[0];
      const orderWay = splitted[1];

      orderBy[orderIndex] = orderWay;
    } else {
      orderBy['nimi'] = 'asc';
    }

    const options: FetchParams = { take, orderBy };

    if (fields) options.select = select;

    let data = await fetchData(prisma.maakond, options);

    res.json({
      limit: take,
      amt: data.length,
      data,
      date: new Date(),
    });
  } catch (error) {
    res.status(error.code || 400).json({ error: error.message });
  }
});

async function fetchData(
  instance: any,
  { select, take, orderBy }: FetchParams
) {
  const options: any = { take, orderBy };

  if (select) options.select = select;

  return instance.findMany(options);
} */

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on %s!', port));

process.on('exit', () => {
  prisma.$disconnect();
});
