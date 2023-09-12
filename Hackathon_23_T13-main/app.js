import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config();

const port = 8000

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')

dotenv.config();

// 모델을 서버와 연결하기 const
//const pageRouter = require('./routes/page')
const authRouter = require('./routes/auth')
const indexRouter = require('./routes')
const { sequelize } = require('./models')
const passportConfig = require('./passport')
const boardRouter = require('./routes/board')

const app = express();
passportConfig() // 패스포트 설정
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

// 모델을 서버와 연결하기
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
})
  .catch((err) => {
    console.error(err);
  })

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

//app.use('/', pageRouter);
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/board', boardRouter)

app.use((req, res, next) => {
  const error = new Error('${req.method} ${req.url} 라우터가 없습니다')
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500)
  res.render('error')
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});