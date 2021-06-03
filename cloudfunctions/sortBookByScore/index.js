// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  isbn =parseInt(event.bookISBN) 
  const _ = db.command     //获取数据库查询及更新指令
  return await db.collection("books")  //获取集合book的引用
    .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      bname: true,
      author: true,
      tags:true,
      score:true,
      pic_link:true,
      intro:true,
      abstract:true,
      bid:true,
      ISBN:true
    })
    .limit(10)//到时记得删除
    .orderBy('score', 'desc')
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      console.log(res.data[0])
      console.log('[数据库] [查询记录] 成功: ', res)
      list_ISBN=[]
      res.data.forEach(
        function(item, index){
          list_ISBN.push(item.ISBN.toString())
          }
      )
      return {
        data:{
          list_ISBN
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
}