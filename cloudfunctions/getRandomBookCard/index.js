// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  random_book_id = parseInt(Math.random()*296)
  const db = cloud.database() 
  const _ = db.command     //获取数据库查询及更新指令
  return await db.collection("books")  //获取集合book的引用
  .where({              //查询的条件指令where
    bid: random_book_id   //查询筛选条件，gt表示字段需大于指定值。
  })
  .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      bname: true,
      author: true,
      tags:true,
      score:true,
      pic_link:true,
      intro:true,
      abstract:true,
      bid:true
    })
    .limit(1) 
    .get()                  //获取根据查询条件筛选后的集合数据
    .then(res => {
      console.log(res.data[0])
      console.log('[数据库] [查询记录] 成功: ', res)
      return {
        data:{
          bookName:res.data[0].bname,
          bookAuthor:res.data[0].author,
          bookCategory:res.data[0].tags.replace(" ",","),
          bookAvgRate:res.data[0].score.toString(),
          bookImgSrc:res.data[0].pic_link,
          bookIntro:res.data[0].intro,
          bookCuts:[
            res.data[0].abstract
          ]//摘录列表
        }
        
      }
    })
    .catch(err => {
      console.error(err)
    })
  
}