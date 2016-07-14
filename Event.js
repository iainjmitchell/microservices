var Event = {
	create : function(stream, payload){
		return {
			'stream' : stream,
			'timestamp' : Date.now,
			'payload' : payload
		};
	}
};

module.exports = Event;