var express = require('express');
var router = express.Router();
let yuangong = require('../sql/yuangong')
/* GET home page. */
router.get('/', function (req, res, next) {
  yuangong.find({}, (err, data) => {
    res.render('order', {
      index: 3,
      data: data
    })

  })
});

router.get('/add', (req, res, next) => {
  res.render('orderAdd', {
    index: 3
  })
})

router.post('/addAction', (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  obj.age = obj.age * 1;
  yuangong.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.redirect('/order')
  })
})

router.get('/delete', (req, res, next) => {
  yuangong.deleteOne({
    '_id': req.query._id
  }, (err, data) => {
    if (err) {
      console.log('删除失败', err);
    }
    console.log('删除成功', data);
    res.redirect('/order')
  })
})

// 修改前查询
router.get('/update', (req, res, next) => {
  const _id = req.query._id;
  yuangong.findById({
    '_id': _id
  }, (err, data) => {
    if (err) {
      console.log('查询修改数据失败', err);
    }
    console.log('查询修改数据成功', data);
    res.render('orderUpdate', {
      index: 3,
      data: data
    })
  })
})
// 修改数据
router.post('/updateAction', (req, res, next) => {
  const obj = req.body;
  console.log('obj1111111111', obj);
  yuangong.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log('修改失败', err);
    }
    console.log('修改成功', data);
    res.redirect('/order')
  })
})

// 搜索
router.get('/search', (req, res, next) => {
  const obj = req.query;
  let reg = new RegExp(obj.search);
  yuangong.find({
    username: reg
  }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('order', {
      index: 3,
      data
    })
  })
})

// 排序
router.get('/sort1', (req, res) => {
  yuangong.find({}).sort({
    time: 1
  }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('order', {
      index: 3,
      data
    })
  })
})

router.get('/sort2', (req, res) => {
  yuangong.find({}).sort({
    time: -1
  }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('order', {
      index: 3,
      data
    })
  })
})

module.exports = router;