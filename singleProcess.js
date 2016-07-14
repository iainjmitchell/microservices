var unirest = require('unirest');
var Event = require('./Event');

var EDITORIAL_TIMELINE_URL = 'http://localhost:9090'


newExperienceEvent = Event.create('newExperience', {
	'on-air-id' : '123',
	'experienceUrl': 'http://badger.com/face.img'
});

sendEvent(EDITORIAL_TIMELINE_URL+'/newExperience', newExperienceEvent);


newScheduleEvent = Event.create('newSchedule', {
	'on-air-id' : '123',
	'content-id' : 'xyz',
	'programme-start' : '0',
	'programme-end' : '2000',
});

newScheduleEvent2 = Event.create('newSchedule', {
	'on-air-id' : '999',
	'content-id' : 'iain',
	'programme-start' : '0',
	'programme-end' : '2000',
});

sendEvent(EDITORIAL_TIMELINE_URL+'/newSchedule', newScheduleEvent);
sendEvent(EDITORIAL_TIMELINE_URL+'/newSchedule', newScheduleEvent2);

function sendEvent(url, event){
	unirest
		.post(url)
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send(event)
		.end(function (response) {
			 console.log(response.body);
		});
}
