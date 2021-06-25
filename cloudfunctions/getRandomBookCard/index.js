// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  random_book_id = parseInt(Math.random()*300)
  const db = cloud.database() 
  const _ = db.command   
  tmp=[]  
  a=[]
  b=[]
  isbn=""
  abstractTrim=""
  introTrim=""
  await db.collection("books")  
  .where({              
    bid: parseInt(Math.random()*300)
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
      ISBN:true
    })
    .limit(1) 
    .get()                
    .then(res => {
      console.log(res.data)
      isbn=res.data[0].ISBN 
      abstractTrim=res.data[0].abstract.trim()
      introTrim=res.data[0].intro.trim()
    }
    )
    .catch(err => {
      console.error(err)
    })

    await db.collection("comments")  
      .where({             
        ISBN:  isbn
      }).field({
        comment:true,
        username:true
      }).get()
      .then(res =>{
        
        res.data.forEach(
          function(item, index){
            a.push(item.comment)
            b.push(item.username)
            }
        )
      })

      for(i=0;i<a.length;i++){
        tmp.push(
          {
            authorComment:b[i],
            comment:a[i],
          }
        )
      }

      return {
        data:{
          comments:tmp,
          ISBN:isbn,
          bookIntro:introTrim,
          bookCuts:[
            abstractTrim
          ]
        }
      }
      
  
}