// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  
  console.log("score:",event.score)
  console.log("usrID:",event.usrID)
  console.log("bookISBN:",event.bookISBN)
  await db.collection('usrRate')
  .where({
    ISBN:event.bookISBN,
    usrID:event.usrID,
  })
  . get()
  .then(res =>{
    console.log("data.len: ",res.data.length)
    if(res.data.length == 0){
      console.log("我进来了")
      console.log("ISBN:",event.bookISBN)
      db.collection('usrRate')
      .add({
        data:{
          ISBN:event.bookISBN,
          score:event.score,
          usrID:event.usrID,
        }
      })
    }else{
      console.log("进入了else")
      .where({
        ISBN:event.bookISBN,
        usrID:event.usrID,
      })
      .update({
        data:{
          score:event.score,
        }
      })
    }
  }).catch(e=>{console.error(e)})
  return true
}