import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { TestService } from '../services/TestService';
import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./database.sqlite');
const app = express();
app.use(helmet());
app.use(cors());
// ルーティングする
const router = express.Router();

// routerにルーティングの動作を記述する
router.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'Hello, world' });
});

router.get('/test', (req, res, next) => {
  const service = new TestService();
  service
    .test()
    .then(result => res.status(200).send(result))
    .catch(next);
});


router.get('/test/sqlite/:user', (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.params;
  console.log(user)
  db.get('SELECT * FROM users WHERE user = ?', [user], (err, row) => {
    if (err) {
      return next(err);
    }

    if (row) {
      res.status(200).send(row);
    } else {
      res.sendStatus(404);
    }
  });
});

// -------------------------------------------------
//  以下、何のルーティングにもマッチしないorエラー
// -------------------------------------------------

// いずれのルーティングにもマッチしない(==NOT FOUND)
app.use((req, res) => {
    res.status(404);
    res.render('error', {
      param: {
        status: 404,
        message: 'not found'
      },
    });
  });

//routerをモジュールとして扱う準備
module.exports = router;