import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/all', async (req, res) => {
  let maakonnad = await prisma.maakond.findMany({
    select: {
      id: true,
      nimi: true,
      pindala: true,
      rahvaarv: true,
      keskus: { select: { id: true, nimi: true } },
    },
  });

  let linnad = await prisma.linn.findMany();

  const data = {
    maakonnad,
    linnad,
  };

  const response = {
    amount: maakonnad.length + linnad.length,
    date: new Date(),
    data,
  };

  res.json(response);
});

export default router;
