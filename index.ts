import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on %s!', port));

process.on('exit', () => {
  prisma.$disconnect();
});
