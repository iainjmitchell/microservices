var unirest = require('unirest');

var Event = {
	create : function(stream, payload){
		return {
			'stream' : stream,
			'timestamp' : Date.now,
			'payload' : payload
		};
	}
};

var EditorialTimeline = function(){
	var experiences = {};

	this.newSchedule = function(newScheduleEvent){
		var payload = newScheduleEvent['payload'];
		var newTimeLineEvent = Event.create('newTimeline', {
				'tv-content-id' : payload['content-id'],
				'start' : payload['programme-start'],
				'end' : payload['programme-end'],
				'experience' : getExperience(payload['on-air-id'])
		});

		unirest
			.post('http://localhost:8080/newTimeLine')
			.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
			.send(newTimeLineEvent)
			.end(function (response) {
			  console.log(response.body);
			});
		return this;
	};

	function getExperience(onAirId){
		if (!!experiences[onAirId]){
			return experiences[onAirId];
		}
		else {
			return 'NOTHING :(';
		}
	}

	this.newExperience = function(newExperienceEvent){
		var payload = newExperienceEvent['payload'];
		experiences[payload['on-air-id']] = payload['experienceUrl'];
	};
};

var editorialTimeline = new EditorialTimeline();

newExperienceEvent = Event.create('newExperience', {
	'on-air-id' : '123',
	'experienceUrl': 'http://badger.com/face.img'
});

editorialTimeline.newExperience(newExperienceEvent);


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
editorialTimeline
	.newSchedule(newScheduleEvent)
	.newSchedule(newScheduleEvent2);

