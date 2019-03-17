var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/', function (req, res, next) {
    console.log(req.query)

  let {dataName} = req.query;
  if (!dataName) {
    res.send({error:1,msg:'dataName为必传参数'})
    return;
  }


  mgdb({
    collection: dataName
  }, ({ collection, client }) => {
    collection.find(
    //     {},
    // // //   q ? { title: eval('/' + q + '/g') } : {},
    //   {
    //     projection: {
    //       id: 1, title: 1, imageUrls:1,price,
    //     },
    //     // sort: rule ? { [rule]: -1 } : { 'time': -1 } //排序条件默认按时间排序
    //   }
    ).toArray((err, result) => {
    //   let checkResult = result.slice(start * count, start * count + count)//提取要分页的数据
    //   let data = {
    //     total:result.length,
    //     start:start+1,count,
    //     page_count: Math.ceil(result.length / count),//计算总页数
    //     page_data: checkResult,
    //   }
      res.send({error:0,msg:'成功',data:result,dataName:dataName});
      client.close();
    })
  })

});

module.exports = router;