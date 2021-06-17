// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  random_book_id = parseInt(Math.random()*300)
  const db = cloud.database() 
  const _ = db.command     
  a=[]
  b=[]
  return await db.collection("books")  
  .where({              
    bid: random_book_id   
  })
  .field({             
      _id:false,         
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
    .limit(1) 
    .get()                
    .then(res => {
      isbn=res.data[0].ISBN 
      db.collection("comments")  
      .where({             
        ISBN:  isbn
      }).field({
        comment:true,
        username:true
      }).get()
      .then(res1 =>{
        abstractTrim=res.data[0].abstract.trim()
        introTrim=res.data[0].intro.trim()
        res1.data.forEach(
          function(item, index){
            a.push(item.comment)
            b.push(item.username)
            }
        )
        comments = a
        userName = b
        a=[]
        b=[]
      })
      return {
        data:{
          userName,
          comments,
          ISBN:res.data[0].ISBN,
          bookIntro:abstractTrim,
          bookCuts:[
            introTrim
          ],
          
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
  
}