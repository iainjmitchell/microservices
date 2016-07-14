var uuid = require('uuid');
var Event = {
	create : function(stream, payload, causedById, source){
		return {
			'id' : uuid.v4(),
			'stream' : stream,
			'timestamp' : Date.now,
			'payload' : payload,
			'causedById' : causedById,
			'source' : source
		};
	}
};

module.exports = Event;