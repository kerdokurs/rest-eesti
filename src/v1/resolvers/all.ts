import { Router } from 'express';
import prisma from '../prisma';
import DataResponse from '../interfaces/DataResponse';
import { filterParams, verifyFilterParams } from '../middleware/filterParams';
import { maakondFields } from '../fields/Maakond';
import { linnFields } from '../fields/Linn';

const router = Router();

router.get('/all', filterParams, async (req: any, res: any, next: any) => {
  try {
    const { filter } = res.locals;

    let errorField = verifyFilterParams(filter, maakondFields);
    errorField = verifyFilterParams(filter, linnFields);

    if (errorField) throw Error(`Viga küsitud väljas ${errorField}`);

    const maakonnad = await prisma.maakond.findMany(filter);

    const linnad = await prisma.linn.findMany(filter);

    const data = {
      maakonnad,
      linnad,
    };

    const response: DataResponse = {
      amount: maakonnad.length + linnad.length,
      date: new Date(),
      data,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
