// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('events').doc(event.eid).update({
      data: {
        content: event.content,
        time: new Date(event.time)
      },
    })
  } catch (e) {
    console.error(e)
  }
}