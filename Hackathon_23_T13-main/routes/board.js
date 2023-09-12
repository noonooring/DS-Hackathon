const express = require('express');
const router = express.Router();

const template = require('../template/board');
const { sequelize } = require('../models');
const Board = require('../models/board');

router.get('/create', async (req, res) => {  // 게시글 작성하기
    // res.send(template.create());
    // res.send(`글 작성 페이지 html`)
});

router.post('/create', async (req, res) => {  // 게시글 작성 등록하기
    try {
        const newBoard = await Board.create({
            title: req.body.title,
            body: req.body.body,
            writerId: req.body.writer,
            category: req.body.category,
        })
        // console.log(newBoard.id)
        res.redirect(`/board/${newBoard.id}`)
    } catch (error) {
        console.log(error);
    }
});

router.get('/update/:id', async (req, res) => {   // 기존 작성한 내용 가져오기
    try {
        const id = req.params.id;
        const aBoard = await Board.findOne({
            where: { id: id }
        })
        // res.json(board)
        res.send(template.update(aBoard.title, aBoard.body, aBoard.id))
    } catch (error) {
        console.log(error)
    }
});

router.post('/update', async (req, res) => {  // 게시글 수정 반영하기
    try {
        const { id, title, body, category } = req.body;

        const updatedBoard = await Board.update(
            { title, body, category },
            { where: { id: id } }
        )
        res.redirect(`/board/${id}`)  // 상세 페이지로 리디렉션
    } catch (error) {
        console.log(error);
    }
});

router.post('/delete', async (req, res) => {  // 게시글 삭제하기
    try {
        const id = req.body.id
        const deletedBoard = await Board.destroy({
            where: { id: id }
        })
        res.redirect('/board')  // 전체 목록으로 리디렉션
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {  // 게시글 상세 보기
    try {
        const id = req.params.id;
        const aBoard = await Board.findOne({
            where: { id: id }
        })
        res.json(aBoard)
        // res.send(template.page(aBoard.title, aBoard.body, aBoard.insertDate, aBoard.id))
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {  // 전체 게시글 목록 보내기
    console.log(req.body)
    try {
        const boardList = await Board.findAll({
            order: [['insertDate', 'DESC']]
        })
        res.send(boardList);
        // res.send(template.list(boardList))
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;