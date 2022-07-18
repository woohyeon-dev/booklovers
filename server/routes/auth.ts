import express from 'express';
import User from '../db/models/User';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const exEmail = await User.findOne({
      // 이메일 중복 검사
      where: {
        email: email,
      },
    });
    if (exEmail) {
      return res
        .status(409)
        .send('This email is already registered as a member.');
    }

    // bcrypt - 비밀번호 해쉬화하기
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hash,
    });

    return res.send('User registered successfully!');
  } catch (err) {
    next(err);
  }
});

export default router;
