var restify = require('restify');
var unirest = require('unirest');
var Event = require('./Event');

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

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

server.post('/newExperience', function(request, response){
	editorialTimeline.newExperience(request.body);
	response.send(200);
});

server.post('/newSchedule', function(request, response){
	editorialTimeline.newSchedule(request.body);
	response.send(200);
})

server.listen(9090, function() {
  console.log('%s listening at %s', server.name, server.url);
});