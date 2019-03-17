var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb');
router.get('/', function(req, res, next) {
console.log(req.query)
  let {start,q,rule,count}=res.params;
  mgdb(
    {
      collection:'banner'
    },
    ({collection,client})=>{
      collection.find(
        q ? {title: eval('/'+ q +'/g') } : {},{
        projection:{
          _id:0,title:1
        },
        sort:rule ? {[rule]:-1} : {'time':-1}
      }).toArray((err,result)=>{
        // let checkResult=result.slice(start*count,start*count+count)//提取要分页的数据
        console.log(result)
        let data = {
          error:0,msg:'成功',
          total:result.length,
          start:start+1,count,
          page_count: Math.ceil(result.length / count),//计算总页数
          page_data: result,
        }
        res.send(data);
        client.close();
      })
    }
  );
});

module.exports = router;
