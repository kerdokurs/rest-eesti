export const errorHandler = (error: any, req: any, res: any, next: any) => {
  res.status(error.code || 500).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : '🥞',
  });
};
