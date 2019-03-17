var express = require('express');
var router = express.Router();
var pathLib = require('path')
var uploadUrl = require('../../../config/global').upload.product
var fs = require('fs');
var mgdb = require('../../../common/mgdb')

router.get('/', function(req, res, next) {

  //1.必传参数
  let dataName = req.query.dataName;
  if(!dataName){
    res.redirect('/admin/error?msg=dataName为必传参数')
    return;
  }

  //公共数据 start=1|q=''|rule=''|page_header|dataName|user_session
 
  
  mgdb({
    collection: "banner"
  }, ({ collection, client }) => {
    collection.find(
      {},
      {projection: {title: 1,_id:0}}
      ).toArray((err, result) => {
        let common_data={
          ...res.user_session,
          ...res.params,
          page_header:dataName+'添加',
          data:result
        }
     res.render('product/add',common_data);
    })
  })
});

router.post('/submit', function(req, res, next) {
console.log(req.body)
  //1.必传参数
  let dataName = req.body.dataName;
  if(!dataName){
    res.send('/admin/error?msg=dataName为必传参数')
    return;
  }

  //2.整理公共数据|库数据
  let {title,price,id,purpose,brandName,hot} = req.body;
  let time = Date.now();//添加时间
  
  //multer拆出上传图片,需要解决没有上传头像
  let imageUrls = [];
  if(req.files.length>0){
    for(var i=0;i<req.files.length;i++){
        fs.rename(
          req.files[i].path,
          req.files[i].path+pathLib.parse(req.files[i].originalname).ext,()=>{}
          )
        imageUrls.push(uploadUrl + req.files[i].filename + pathLib.parse(req.files[i].originalname).ext);
    }
  }else{
      imageUrls = ["https://img11.360buyimg.com/mobilecms/jfs/t4624/286/3511646442/51053/6729fe5b/58ff0bd8N3ededf64.jpg",
                    "https://img14.360buyimg.com/mobilecms/jfs/t5485/30/408626608/135695/739ef390/58ff0bd8N36dbf858.jpg",
                    "https://img12.360buyimg.com/mobilecms/jfs/t5404/10/416957159/85079/f14ef29f/58ff0bd8N6f9dac7d.jpg",
                      "https://img12.360buyimg.com/mobilecms/jfs/t4891/343/2382001647/77939/2f8d4ff4/58ff0bd8N41f748f4.jpg"]
  }
  //3.写库 + 跳转

  mgdb({
    collection:dataName
  },({collection,client})=>{
    collection.insertOne({
      hot,brandName,purpose,imageUrls,dataName,title,time,price,id
    },(err,result)=>{
      if(!err && result.result.n){
        res.send('/admin/product?dataName='+dataName+'&start=1')
      }else{
        res.send('/admin/error?msg=集合操作错误')
      }
      client.close();
    })
  })

});

module.exports = router;
