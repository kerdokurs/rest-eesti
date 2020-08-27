export const forceHTTPS = (req: any, res: any, next: any) => {
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV !== 'development'
  )
    return res.redirect('https://' + req.get('host') + req.url);
  next();
};
