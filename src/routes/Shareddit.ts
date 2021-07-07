import { Request, Response } from 'express';
import queryString from 'query-string';

import getRedditData from '../business/getRedditData';
import { SkeletonRedditSubmission } from '../business/types';
import { generateUploadURL } from '../s3';

const validateParams = async (
  params: queryString.ParsedQuery<any>
): Promise<SkeletonRedditSubmission> => {
  const output: SkeletonRedditSubmission = {
    sub: params.sub,
    postID: params.postID,
    urlTitle: params.title ? params.title : undefined,
    commentID: params.commentID ? params.commentID : undefined,
    redact: params.redact ? true : false,
  };

  return output;
};

export const notFound = async (req: Request, res: Response) => {
  return res.status(404);
};

export const getImageUploadURL = async (req: Request, res: Response) => {
  const query = req.path.substr(14, req.path.length);
  const params = queryString.parse(query);
  let type = params.type;
  if (!type) {
    return res.send(400);
  } else if (Array.isArray(type)) {
    type = type[0];
  }
  const uploadURL = await generateUploadURL(type);
  return res.send({ uploadURL });
};

export const parseQueryString = async (req: Request, res: Response) => {
  try {
    const query = req.path.substr(10, req.path.length);
    const params = queryString.parse(query);
    const generationParams: SkeletonRedditSubmission = await validateParams(
      params
    );

    const sharedditSkeleton = await getRedditData(generationParams);
    return res.send(sharedditSkeleton);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
};

export const redirectRedditPath = async (req: Request, res: Response) => {
  try {
    const { params } = req;

    const query = queryString.stringify(params, { skipNull: true });

    return res.redirect(`/editor/${query}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
};
