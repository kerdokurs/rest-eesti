import { Router } from 'express';
import prisma from '../prisma';
import DataResponse from '../interfaces/DataResponse';
import { filterParams, verifyFilterParams } from '../middleware/filterParams';
import { maakondFields } from '../fields/Maakond';

const router = Router();

router.get(
  '/maakonnad',
  filterParams,
  async (req: any, res: any, next: any) => {
    try {
      const { filter } = res.locals;

      const errorField = verifyFilterParams(filter, maakondFields);
      if (errorField) throw Error(`Viga küsitud väljas ${errorField}`);

      const maakonnad = await prisma.maakond.findMany(filter);

      const data: DataResponse = {
        amount: maakonnad.length,
        date: new Date(),
        data: maakonnad,
      };

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
