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

const updateEvent = (eid, new_content) => {
  wx.cloud.init();
  const db = wx.cloud.database();
  return db.collection("events").where({
    _id: eid
  }).update({
    data: new_content
  });
}

const createEvent = new_event => {
  wx.cloud.init();
  const db = wx.cloud.database();
  return db.collection("events").add({data: new_event});
}

module.exports = {
  retrieveEvents,
  retrieveEventsById,
  updateEvent,
  createEvent
}