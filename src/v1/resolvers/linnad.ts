import { Router } from 'express';
import prisma from '../prisma';
import DataResponse from '../interfaces/DataResponse';
import { filterParams, verifyFilterParams } from '../middleware/filterParams';
import { linnFields } from '../fields/Linn';

const router = Router();

router.get('/linnad', filterParams, async (req: any, res: any, next: any) => {
  try {
    const { filter } = res.locals;

    const errorField = verifyFilterParams(filter, linnFields);
    if (errorField) throw Error(`Viga küsitud väljas ${errorField}`);

    const linnad = await prisma.linn.findMany(filter);

    const data: DataResponse = {
      amount: linnad.length,
      date: new Date(),
      data: linnad,
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
