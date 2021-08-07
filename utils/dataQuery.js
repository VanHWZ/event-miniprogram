const env = "mini-prd-1g478uj7eef9a54f";

const retrieveEvents = function() {
  // wx.cloud.init({
  //   env: env
  // });
  wx.cloud.init();
  const db = wx.cloud.database();
  var events = db.collection("events"); 
  return events.get();
}

const retrieveEventsById = eid => {
  // wx.cloud.init({
  //   env: env
  // });
  wx.cloud.init();
  const db = wx.cloud.database();
  var events = db.collection("events").where({
    _id: eid
  });
  console.log(eid);
  return events.get();
}

module.exports = {
  retrieveEvents,
  retrieveEventsById
}