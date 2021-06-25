// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {
  isbns=[]
  names =[]
  tmp=[]
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  usrID = event.usrID
  // if(collectionInfos.length == 0){
    
  await db.collection('collections')
  .where({
    usrID:event.usrID,
  })
  .get()
  .then(res=>{
    for(i=0;i<res.data.length;i++){
      isbns.push(res.data[i].ISBN)
    }
  })
  .catch(err => {
    console.error(err)
  })

  for(i=0;i<isbns.length;i++){
    await db.collection('books')
    .where({
    ISBN:isbns[i],
    })
    .get()
    .then(res=>{
      names.push(res.data[0].bname)
    })
    .catch(err => {
      console.error(err)
    })
  }

  for(i=0;i<isbns.length;i++){
    tmp.push({
      bookName:names[i],
      bookISBN:isbns[i],
    })
  }

  return {
    data:{
      collectionInfo:tmp,
    }
  }
}