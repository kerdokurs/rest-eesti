import { Router } from 'express';

import all from './resolvers/all';
import maakonnad from './resolvers/maakonnad';

const router = Router();

router.get('/', (req, res) => {
  res.send('v1 index');
});

router.use(all);
router.use(maakonnad);

export default router;
