var express = require('express');
var router = express.Router();
var mgdb = require('../../../common/mgdb')

router.get('/', function (req, res, next) {
  //1.必传参数
  let {dataName,_id,start} = res.params;
  if (!dataName || !_id) {
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }

  //公共数据 
  let common_data = {
    ...res.user_session,
    ...res.params,
    page_header: dataName + '修改',
    start:start+1
  }
  //找到这条数据
  mgdb({
    collection: dataName
  }, ({ collection, client, ObjectID }) => {
    collection.find({
      _id: ObjectID(_id)
    }).toArray((err, result) => {
      if (!err && result.length>0) {
        let page_data = result[0];
        mgdb({
          collection: "banner"
        }, ({ collection, client, ObjectID }) => {
          collection.find({
          },{projection: {
            title: 1,_id:0
          },}).toArray((err, result1) => {
            if (!err && result1.length>0) {
              let data ={
                ...common_data,page_data,dataCheck:result1
              }
              res.render('product/check.ejs',data)
            } else {
              res.redirect('/admin/error?msg=' + dataName + '操作错误')
            }
            client.close();
          })
        })
      } else {
        res.redirect('/admin/error?msg=' + dataName + '操作错误')
      }
      client.close();
    })
  
  })

});

router.post('/submit', function (req, res, next) {
  //1.必传参数
  let dataName = req.body.dataName;
  let _id = req.body._id;
  if (!dataName || !_id) {
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }

  // //可选参数
  let start = req.body.start ? req.body.start - 0 : require('../../../config/global').page_start
  let count = req.body.count ? req.body.count - 0 : require('../../../config/global').page_num
  let q = req.body.q ? req.body.q : require('../../../config/global').q;
  let rule = req.body.rule ? req.body.rule : require('../../../config/global').rule;

  //2.整理公共数据|库数据
  // let {hot,brandName,purpose,dataName,title,price,id} = req.body;
  let hot = req.body.hot;
  let brandName = req.body.brandName;
  let purpose = req.body.purpose;
  let price = req.body.price;
  let title = req.body.title;
  let id = req.body.id;
console.log(id,title,price,purpose,brandName,hot)
  mgdb({
    collection:dataName
  },({collection,client,ObjectID})=>{
    collection.updateOne({
      _id:ObjectID(_id)
    },{
      $set:{hot,brandName,purpose,dataName,title,price,id}
    },(err,result)=>{
      if(!err && result.result.n){
        res.send('/admin/product?dataName='+dataName+'&start='+start+'&count='+count+'&q='+q+'&rule='+rule)
      }else{
        res.send('/admin/error?msg=集合操作错误')
      }
      client.close();
    })
  })
});

module.exports = router;
