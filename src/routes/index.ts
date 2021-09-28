import { Router } from 'express';
import { parseQueryString, notFound } from './Shareddit';

const sharedditRouter = Router();

sharedditRouter.get('/', notFound);
sharedditRouter.get('/generate', notFound);
sharedditRouter.get('/generate/*', parseQueryString);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', sharedditRouter);

export default baseRouter;
