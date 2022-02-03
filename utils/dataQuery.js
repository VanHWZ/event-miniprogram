const env = "mini-prd-1g478uj7eef9a54f";

const retrieveEvents = function() {
  wx.cloud.init();
  const db = wx.cloud.database();
  var events = db.collection("events"); 
  return events.get();
}

const retrieveEventsById = eid => {
  wx.cloud.init();
  const db = wx.cloud.database();
  var events = db.collection("events").where({
    _id: eid
  });
  return events.get();
}

const updateEvent = (eid, updatedEvent) => {
  wx.cloud.init()
  const db = wx.cloud.database()
  console.log(eid, updatedEvent)
  var result
  return wx.cloud.callFunction({
    // 云函数名称
    name: 'updateEvent',
    // 传给云函数的参数
    data: {
      ...updatedEvent,
      eid: eid,
    },
  })
  return result
}

const createEvent = new_event => {
  wx.cloud.init();
  const db = wx.cloud.database();
  default_event = {
    pic_url: "",
    sticky_on_top: false
  };
  var combined_event = Object.assign(new_event, default_event);
  console.log(combined_event);
  return db.collection("events").add({data: new_event});
}

const deleteEvent = eid => {
  wx.cloud.init();
  const db = wx.cloud.database();
  return db.collection("events").where({
    _id: eid
  }).remove();
}

module.exports = {
  retrieveEvents,
  retrieveEventsById,
  updateEvent,
  createEvent,
  deleteEvent
}