import express from 'express';

export function logger(): express.RequestHandler {
  return (req, res, next) => {
    console.log(`[${req.method.toUpperCase()}] ${req.path}`);
    next();
  };
}
