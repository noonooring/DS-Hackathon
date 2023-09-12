export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요')
    }
}

export function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.')
        res.redirect('/?error=${message}')
    }
}