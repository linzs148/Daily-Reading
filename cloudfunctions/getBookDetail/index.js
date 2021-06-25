// 云函数入口文件
const cloud = require('wx-server-sdk')
bookName = "null"
cloud.init()
usrRate = -1//
bookAvgRate = -1//
bookImgSrc = "null"//
bookCategory = "null"//
bookIntro = "null"//
bookCuts = []//
usrName = "nameless"
usrCollected = false//弔东西还没写
bookComments = []//
usrID = -1//
bookISBN = -1//
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()
  
  bookISBN = event.bookISBN
  usrID = event.usrID
  console.log("bookISBN:",bookISBN)
  console.log("usrID:",usrID)
  await db.collection('books')
  .where({
    ISBN:bookISBN
  })
  .field({
    //bookCuts只有一条，没有comments，没有usrRate，没有usrCollected，没有usrName
    _id:false,
    ISBN:false,
    author:false,
    bid:false,
    tags:false,
  })
  .get()
  .then(res=>{
    switch( res.data[0].category){
      case 0:
        // console.log("来到了case0")
        bookCategory = "科幻";
        break;
      case 1:
        bookCategory = "推理";
        break;
      case 2:
        bookCategory = "言情";
        break;
      case 3:
        bookCategory = "武侠";
        break;
      case 4:
        bookCategory = "计算机";
        break;
      case 5:
        bookCategory = "经济学";
        break;
      case 6:
        bookCategory = "儿童文学";
        break;
      case 7:
        bookCategory = "社会";
        break;
      case 8:
        bookCategory = "艺术";
        break;
      case 9:
        bookCategory = "政治";
        break;
      case 10:
        bookCategory = "职场";
        break;
      case 11:
        bookCategory = "教育";
        break;
      case 12:
        bookCategory = "科技";
        break;
      case 13:
        bookCategory = "悬疑";
        break;
      case 14:
        bookCategory = "心理";
        break;
      default:
        break;
    }
    console.log("执行到了第一个then")
    bookAvgRate = res.data[0].score
    bookImgSrc = res.data[0].pic_link
    bookIntro = res.data[0].intro
    bookName = res.data[0].bname
    bookCuts = []
    bookCuts.push(res.data[0].abstract)
    db.collection('comments').where({
      ISBN:parseInt(bookISBN)
    })
    .field({
      _id:false,
      ISBN:false,
      uid:false,
    })
    .get()
    .then(res1 => {
      console.log("执行到了第二个then")
      bookComments = []
      res1.data.forEach(
        function(item, index){
          bookComments.push({
            usrName:item.username,
            comment:item.comment,
          })
        }
      )
    })

  })
  .catch(e=>{console.error(e)})
  await db.collection('usrRate').where({
    usrID:usrID,
    ISBN:parseInt(bookISBN),
  })
  .field({
    _id:false,
    ISBN:false,
    usrID:false,
  })
  .get()
  .then(res2 => {
    console.log("执行到第三个then")
    if(res2.data.length>0){
      console.log("表里的score:",res2.data[0].score)
      usrRate = res2.data[0].score
    }else{
      usrRate = -1
    }
  })

  await db.collection('collections')
  .where({
    usrID:event.usrID,
    ISBN:parseInt(event.bookISBN),
  })
  .get()
  .then(res3=>{
    if(res3.data.length == 0){
      // db.collection('collections')
      // .add({
      //   data:{
      //     ISBN:event.bookISBN,
      //     collected:false,
      //     usrID:event.usrID,
      //   }
      // })
      usrCollected = false
    }else{
      usrCollected = true
    }
  })
  return {
    data:{
    bookISBN,
    usrRate,
    bookAvgRate,
    bookImgSrc,
    bookCategory,
    bookIntro,
    bookCuts,
    usrName,
    usrCollected,
    bookComments,
    usrID,
    bookName,
    }
 }
}