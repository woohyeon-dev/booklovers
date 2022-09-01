import express from 'express';
import BookLikes from '../models/BookLikes';
import Books from '../models/Books';

const router = express.Router();

// isbn에 해당하는 책의 좋아요 개수랑 해당 유저가 좋아요 눌렀는지에 대한 정보
router.get('/', async (req, res, next) => {
  try {
    const isbns = req.query.isbns as string[];
    const userId: number = req.query.userId ? Number(req.query.userId) : 0;
    const result = [];
    for (let i = 0; i < isbns.length; i++) {
      const book = await Books.findOne({
        attributes: ['idx', 'likesCount'],
        where: { isbn: isbns[i] },
      });
      let isLikes = false;
      const bookId = book?.idx ? book.idx : 0;
      if (userId !== NaN) {
        const bookLikes = await BookLikes.findOne({
          where: { bookId, userId },
        });
        isLikes = bookLikes ? true : false;
      }
      const likesCount = book?.likesCount ? book?.likesCount : 0;
      result.push({ likesCount, isLikes });
    }
    return res.json(result);
  } catch (err: any) {
    next(err);
  }
});

router.get('/user', async (req, res, next) => {
  try {
    console.log('this is called');
    const userId = req.query.userId ? Number(req.query.userId) : 0;
    const books = await BookLikes.findAll({
      where: { userId },
      include: [{ model: Books, attributes: ['image', 'title'] }],
    });
    const result = [];
    for (const b of books) {
      result.push({
        image: b.book?.image,
        title: b.book?.title,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 좋아요 취소
router.post('/likes/cancel', async (req, res, next) => {
  try {
    // 해당 도서 isbn, 기존 좋아요 개수, user idx
    const { isbn, image, title, likesCount, userId } = req.body;
    if (userId) {
      let book = await Books.findOne({
        attributes: ['idx'],
        where: { isbn },
      });
      if (book) {
        if (likesCount !== 0) {
          await Books.update(
            { likesCount: likesCount - 1 },
            { where: { isbn } }
          );
        }
      } else {
        await Books.create({
          // idx 자동생성
          isbn,
          image,
          title,
          likesCount: 0,
        });
      }
      book = await Books.findOne({
        attributes: ['idx'],
        where: { isbn },
      });
      await BookLikes.destroy({ where: { userId, bookId: book?.idx! } });
    }
    return res.json({ msg: '좋아요 취소 완료' });
  } catch (err: any) {
    next(err);
  }
});

// 좋아요
router.post('/likes', async (req, res, next) => {
  try {
    // 해당 도서 isbn, 기존 좋아요 개수, user idx
    const { isbn, image, title, likesCount, userId } = req.body;
    if (userId) {
      let book = await Books.findOne({
        attributes: ['idx'],
        where: { isbn },
      });
      if (book) {
        await Books.update({ likesCount: likesCount + 1 }, { where: { isbn } });
      } else {
        await Books.create({
          // idx 자동생성
          isbn,
          image,
          title,
          likesCount: 1,
        });
      }
      book = await Books.findOne({
        attributes: ['idx'],
        where: { isbn },
      });
      await BookLikes.create({
        // idx 자동생성
        userId,
        bookId: book?.idx!,
      });
    }
    return res.json({ msg: '좋아요 완료' });
  } catch (err: any) {
    next(err);
  }
});

export default router;
