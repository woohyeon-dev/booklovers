import express from 'express';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/upload';
import fs from 'fs';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { nickname, email, password } = req.body;
    const exEmail = await Users.findOne({
      // 이메일 중복 검사
      attributes: ['email'],
      where: {
        email: email,
      },
    });
    if (exEmail) {
      return res.status(400).json({ msg: '이미 가입된 이메일입니다.' });
    }

    // bcrypt - 비밀번호 해쉬화하기
    const hash = await bcrypt.hash(password, 12);

    await Users.create({
      // idx 자동 생성
      nickname,
      email,
      password: hash,
    });

    return res.json({ msg: '회원가입 성공' });
  } catch (err) {
    next(err);
  }
});

router.put('/profile', upload.single('photo'), async (req, res, next) => {
  try {
    const { email, nickname, gender, birthday, isCurrentImg } = req.body;
    if (req.file || !isCurrentImg) {
      const dbFileName = await Users.findOne({
        attributes: ['photo'],
        where: { email },
      });
      if (
        dbFileName?.photo &&
        fs.existsSync('src/uploads/profile/' + dbFileName?.photo)
      ) {
        // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
        fs.unlinkSync('src/uploads/profile/' + dbFileName?.photo);
        console.log('이미지 파일 삭제 성공');
      }
    }
    const fileName = req.file ? req.file.filename : '';
    console.log('email : ', email);
    await Users.update(
      { nickname, gender, birthday, photo: fileName },
      { where: { email } }
    );
    return res.json({ msg: '프로필 수정 완료' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      attributes: ['nickname', 'password', 'gender', 'birthday', 'photo'],
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ msg: '이메일을 확인해주세요' });
    }

    // 비밀번호 비교 체크
    // 첫번째 인자 password : 사용자가 입력한 비밀번호
    // 두번째 인자 user.password : 실제 DB에 있는 비밀번호
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
    } else {
      return res.status(400).json({ msg: '비밀번호를 확인해주세요.' });
    }

    // Access Token 생성
    const accessToken = jwt.sign(
      {
        user: {
          email,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    // Refresh Token 생성
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
      expiresIn: '14d',
    });
    // Refresh Token db에 저장
    await Users.update(
      { refresh_token: refreshToken },
      { where: { email: email } }
    );
    // Refresh Token cookie에 httpOnly옵션을 줘서 저장
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken, msg: '로그인 성공' });
  } catch (err) {
    next(err);
  }
});

router.get('/token', async (req, res, next) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ msg: 'Refresh token does not exist', code: 1 });
    }
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) {
      res.clearCookie('refreshToken');
      return res.status(403).json({ msg: 'Invalid refresh token', code: 1 });
    }
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined
      ) => {
        if (err) {
          return res.sendStatus(403);
        }
        console.log(decoded);
        // Access Token 생성
        const accessToken = jwt.sign(
          {
            user: {
              email: user[0].email,
            },
          },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );
        return res.json({ accessToken, msg: 'Token Refresh Successful!' });
      }
    );
  } catch (err) {
    next(err);
  }
});

router.get('/user', verifyToken, async (req, res, next) => {
  const user = await Users.findOne({
    attributes: ['idx', 'email', 'nickname', 'gender', 'birthday', 'photo'],
    // @ts-ignore
    where: { email: req.user.email },
  });
  return res.json(user);
});

router.post('/logout', async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(204).json({ msg: 'Cookie does not have refresh token' });
  }
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) {
    res.clearCookie('refreshToken');
    return res.status(204).json({ msg: 'Invalid refresh token' });
  }
  const email = user!.email;
  await Users.update(
    { refresh_token: undefined },
    {
      where: {
        email,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.json({ msg: '로그아웃 성공' });
});

export default router;
