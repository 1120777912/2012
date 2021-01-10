const express = require('express');
let router = express.Router();
const admin = require('../sql/admin');

router.get('/', (req, res, next) => {
    console.log('进入注册');
    res.render('register')
})

router.post('/in', (req, res, next) => {
    console.log('注册中');
    let obj = req.body;
    console.log(1111);
    console.log('obj', obj);
    admin.findOne({
        username: obj.username
    }, (err, data) => {
        if (err) {
            console.log('注册查询失败', err);
        } else if (data) {
            console.log('此用户已存在');
            res.render('register')
        } else {
            admin.insertMany(obj, (err, data) => {
                if (err) {
                    console.log('注册失败', err);
                }
                console.log('注册成功', data);
                res.redirect('/login')
            })
        }
    })
})
module.exports = router;