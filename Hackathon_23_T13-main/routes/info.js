const express = require('express');
const router = express.Router();

router.get('/:place', (req, res) => {   // 그냥 html? DB에서 정보 가져옴?
    var title = req.params.place;
    res.send();
});

module.exports = router;