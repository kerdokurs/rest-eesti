import { Router } from 'express';
import prisma from '../prisma';
import DataResponse from '../interfaces/DataResponse';
import { filterParams, verifyFilterParams } from '../middleware/filterParams';
import { linnFields } from '../fields/Linn';
import ErrorResponse from '../interfaces/ErrorResponse';
import { linnaIlm } from '../middleware/ilm';

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

router.get('/linn/:linnId', async (req, res, next) => {
  try {
    const { linnId: id } = req.params;

    const linn = await prisma.linn.findOne({
      where: {
        id,
      },
    });

    if (linn) {
      const response: DataResponse = {
        amount: 1,
        date: new Date(),
        data: {
          ...linn,
          ilm: await linnaIlm(id),
        },
      };

      res.status(200).json(response);
    } else {
      const response: ErrorResponse = {
        status: 404,
        message: `Linna ${id} ei leitud.`,
      };
      res.status(404).json(response);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
