import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/maakonnad', async (req, res) => {
  const maakonnad = await prisma.maakond.findMany({
    select: {
      id: true,
      nimi: true,
      pindala: true,
      rahvaarv: true,
      keskus: { select: { id: true, nimi: true } },
    },
  });

  const data = {
    amount: maakonnad.length,
    date: new Date(),
    data: maakonnad,
  };

  res.json(data);
});

export default router;
