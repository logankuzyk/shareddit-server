import { Router } from 'express';
import {
  redirectRedditPath,
  parseQueryString,
  notFound,
  getImageUploadURL,
} from './Shareddit';

const sharedditRouter = Router();

sharedditRouter.get('/', notFound);
sharedditRouter.get('/r/:sub/comments/:postID/(:title)?', redirectRedditPath);
sharedditRouter.get(
  '/r/:sub/comments/:postID/:title/:commentID',
  redirectRedditPath
);
sharedditRouter.get('/generate/*', parseQueryString);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', sharedditRouter);

export default baseRouter;
