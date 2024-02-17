import morgan from 'morgan';

morgan.token('time', () => {
  return new Date().toISOString();
});

morgan.token('req-body', (req: Request, res: Response) => {
    if(req.method !== 'GET')
  return JSON.stringify(req.body);
});

export default morgan;

