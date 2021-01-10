const express = require('express');
let router = express.Router();
const admin = require('../sql/admin')
router.get('/', (req, res, next) => {
    res.render('login')
})

router.post('/in', (req, res, next) => {
    let {
        username,
        password
    } = req.body;
    //校验携带过来的数据
    if (!username || !password) {
        res.send({
            err: 1,
            msg: '用户名和密码为必传参数'
        });
        return;
    }
    admin.findOne({
        username
    }, (err, data) => {
        if (err) {
            console.log('查询失败', err);
        } else if (data) {
            console.log(data.password, password);
            if (data.password == password) {

                req.session.isLogin = 'ok';
                console.log('登录成功');
                res.redirect('/pro')

            } else {
                res.send({
                    err: 1,
                    msg: '用户名或者密码有误'
                })
            }
        } else {
            console.log('没有此账户');
            res.redirect('/register')
        }
    })
})

module.exports = router;