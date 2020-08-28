import URLQuery, { DEFAULT_LIMIT } from '../interfaces/URLQuery';

export const filterParams = (req: any, res: any, next: any) => {
  const { fields, limit, order }: URLQuery = req.query;

  const select: any = {};
  for (let field of (fields || '').split(',')) select[field] = true;

  const take =
    limit && typeof limit === 'string'
      ? limit === 'all'
        ? null
        : parseInt(limit)
      : DEFAULT_LIMIT;

  const orderBy: any = {};

  if (order) {
    const splitted = order.split(',');
    const orderIndex = splitted[0];
    const orderWay = splitted[1];

    orderBy[orderIndex] = orderWay;
  } else {
    orderBy['id'] = 'asc';
  }

  if (Object.keys(res.locals).length === 0) res.locals = {};

  res.locals.filter = { orderBy };
  if (take) res.locals.filter.take = take;
  if (fields && fields.length > 0) res.locals.filter.select = select;

  next();
};

export const verifyFilterParams = (
  filter: any,
  fields: Array<any>
): string | null => {
  const { select } = filter;

  if (!select) return null;

  for (const key in select) {
    const value = select[key];

    if (!value) continue;
    console.log(fields, key, fields.indexOf(key));

    if (fields.indexOf(key) === -1) return key;
  }

  return null;
};
