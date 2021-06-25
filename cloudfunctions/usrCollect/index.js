// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//更改用户是否收藏某本书
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  usrID = event.usrID
  bookISBN = event.bookISBN
  collect = event.collect // boolean
  console.log("以下是参数：")
  console.log("bookISBN:",bookISBN)
  console.log("usrID:",usrID)
  console.log("collect:",collect)
  if(collect){
    return await db.collection('collections')
    .add({
      data:{
        ISBN:bookISBN,
        usrID:usrID,
        // collected:event.collect,
      }
    })
  }else{
    return await db.collection('collections')
      .where({
        ISBN:bookISBN,
        usrID:usrID,
      })
      .remove()
  }
  

  // await db.collection('collections')
  // .where({
  //   ISBN:bookISBN,
  //   usrID:usrID,
  // })
  // .get()
  // .then(res=>{
  //   if(res.data.length == 0){
  //     db.collection('collections')
  //     .add({
  //       data:{
  //         ISBN:bookISBN,
  //         usrID:usrID,
  //         collected:event.collect,
  //       }
  //     })
  //   }else{
  //     db.collection('collections')
  //     .where({
  //       ISBN:bookISBN,
  //       usrID:usrID,
  //     })
  //     .update({
  //       data:{
  //         collected:event.collect,
  //       }
  //     })
  //   }
  // })
  // return true
}