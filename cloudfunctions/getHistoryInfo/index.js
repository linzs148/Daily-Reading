// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {
  tmp=[]
  isbns=[]
  names =[]
  times=[]
  const db = cloud.database()
  const _ = db.command
  usrID = event.usrID
    
  await db.collection('historys')
  .where({
    usrID:event.usrID,
  })
  .limit(20)
  .orderBy('read_time', 'desc')
  .get()
  .then(res=>{
    for(i=0;i<res.data.length;i++){
      isbns.push(res.data[i].ISBN)
      times.push(
                res.data[i].read_time.getFullYear()+"-"
                +res.data[i].read_time.getMonth()+"-"
                +res.data[i].read_time.getDate()+" "
                +res.data[i].read_time.getHours()+":"
                +res.data[i].read_time.getMinutes()+":"
                +res.data[i].read_time.getSeconds())
    }
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
      read_time:times[i]
    })
  }

  return {
    data:{
      historyInfo:tmp,
    }
  }
}







