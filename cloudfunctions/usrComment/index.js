// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  await db.collection('comments').add({
    data:{
      ISBN:event.bookISBN,
      comment:event.content,
      uid:event.usrID,
      username:event.usrName,
    }
    })
    .catch(err=>{console.error(err)})

    return true
}