var MobileEditorialTimelineGateway = function(){
	var timeLines = {};

	this.newTimeLine = function(newTimeLineEvent){
		eventPayload = newTimeLineEvent['payload'];
		timeLines[eventPayload['tv-content-id']] = mapToMobileTimeline(eventPayload);
		return this;
	};

	function mapToMobileTimeline(eventPayload){
		return {
			'm-start' : eventPayload['start'],
			'm-end' : eventPayload['end'],
			'm-experience' : eventPayload['experience']
		}
	}

	this.get = function(tvContentId) {
		return timeLines[tvContentId];
	};	
};

var Event = {
	create : function(stream, payload){
		return {
			'stream' : stream,
			'timestamp' : Date.now,
			'payload' : payload
		};
	}
};

var EditorialTimeline = function(mobileEditorialTimelineGateway){
	var experiences = {};

	this.newSchedule = function(newScheduleEvent){
		var payload = newScheduleEvent['payload'];
		var newTimeLineEvent = Event.create('newTimeline', {
				'tv-content-id' : payload['content-id'],
				'start' : payload['programme-start'],
				'end' : payload['programme-end'],
				'experience' : getExperience(payload['on-air-id'])
		});
		mobileEditorialTimelineGateway.newTimeLine(newTimeLineEvent);
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

var mobileEditorialTimeline = new MobileEditorialTimelineGateway();
var editorialTimeline = new EditorialTimeline(mobileEditorialTimeline);

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




console.log(mobileEditorialTimeline.get('xyz'));
console.log(mobileEditorialTimeline.get('abc'));
console.log(mobileEditorialTimeline.get('iain'));


