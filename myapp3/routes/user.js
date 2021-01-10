var express = require('express');
var router = express.Router();
const user = require('../sql/user')
const moment = require('moment')
/* GET home page. */

// 首次页面加载查询
router.get('/', function (req, res, next) {
  user.find({}, (err, data) => {
    if (err) {
      console.log('查询失败', err)
    }
    console.log('查询成功', data)

    res.render('user', {
      index: 2,
      data: data,
      page: 0,
      limit: 5
    });
  })
  // user.find({}).skip().limit(5).exec((err, data) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log('分页跳过2  限制5 ')
  //   console.log(data)
  //   res.render('user', {
  //     index: 2,
  //     data: data
  //   });
  // })

});
// 跳转到增加页面
router.get('/add', (req, res, next) => {
  res.render('userAdd', {
    index: 2,
  })
})

// 增加数据
router.post('/addAction', (req, res, next) => {
  console.log(req.body);
  let obj = req.body;
  moment.locale('zh-cn');
  obj.time = moment().add(10, 'days').calendar();
  console.log(obj);
  user.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

})

//删除数据
router.get('/delete', (req, res, next) => {
  user.deleteOne({
    '_id': req.query._id
  }, (err, data) => {
    if (err) {
      console.log('删除失败', err);
    }
    console.log('删除成功', data);
    res.redirect('/user')
  })
})

// 查询要修改的数据
router.get('/update', (req, res, next) => {
  const _id = req.query._id;
  // console.log('11111', _id);
  user.findById({
    '_id': _id
  }, (err, data) => {
    if (err) {
      console.log('查询修改数据失败', err);
    }
    console.log('查询修改数据成功', data);
    res.render('userUpdate', {
      index: 2,
      data: data
    })

  })
})

// 修改数据
router.post('/updateAction', (req, res, next) => {
  const obj = req.body;
  console.log('obj', obj);
  user.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log('修改失败', err);
    }
    console.log('修改成功', data);
    res.redirect('/user')
  })
})


// 搜索数据
router.get('/search', (req, res, next) => {
  const obj = req.query;
  let reg = new RegExp(obj.search);
  user.find({
    username: reg
  }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('查询成功', data);
    res.render('user', {
      index: 2,
      data
    })
  })
})

// 排序
router.get('/sort1', (req, res) => {

  user.find({}).sort({
    time: 1
  }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('user', {
      index: 2,
      data
    })
  })
})

router.get('/sort2', (req, res) => {
  user.find({}).sort({
    time: -1
  }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.render('user', {
      index: 2,
      data
    })
  })
})


// 分页
router.get('/page', (req, res, next) => {
  const page = 0;
  let limit = 5;
  limit = page * 5;
  user.find({}).skip(page).limit(limit).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('分页跳过2  限制5 ')
    console.log(data)
    res.render('user', {
      index: 2,
      data: data
    });
  })
})

module.exports = router;