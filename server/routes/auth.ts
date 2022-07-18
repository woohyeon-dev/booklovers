import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    return res.send('User registered successfully!');
  } catch (err) {
    console.error(err);
  }
});

export default router;
