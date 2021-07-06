import { Router } from 'express';
import {
  redirectRedditPath,
  parseQueryString,
  notFound,
  getStoredImage,
  getImageUploadURL,
} from './Shareddit';

const sharedditRouter = Router();

sharedditRouter.get('/', notFound);
sharedditRouter.get('/r/:sub/comments/:postID/(:title)?', redirectRedditPath);
sharedditRouter.get(
  '/r/:sub/comments/:postID/:title/:commentID',
  redirectRedditPath
);
sharedditRouter.get('/image/:id', getStoredImage);
sharedditRouter.get('/getUploadURL', getImageUploadURL);
sharedditRouter.get('/editor/*', parseQueryString);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', sharedditRouter);

export default baseRouter;
