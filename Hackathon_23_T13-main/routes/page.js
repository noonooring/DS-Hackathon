import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config()

const express = require('express')

const router = express.Router();
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = 0
    res.locals.follwingCount = 0;
    res.locals.followerIdList = {};
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - hackerthon' })
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - hackerthon' });
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'hackerthon',
        twits,
    })
});

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

module.exports = router;
