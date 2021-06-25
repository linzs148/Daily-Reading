// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db =cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    await db.collection("historys").add({
      data:{
        ISBN:parseInt(event.bookISBN),
        usrID:event.uid,
        read_time:new Date()
      }
    }
    )
  }catch(e){
    console.error(e)
  }
  
  return true
  
}