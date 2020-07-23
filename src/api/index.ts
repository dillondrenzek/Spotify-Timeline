import express from 'express';

const api = express();


api.get('/', (req, res) => {
  res.send('Ok');
});

export default api;