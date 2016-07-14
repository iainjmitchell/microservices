var amqp = require('amqplib');
var when = require('when');

// amqp.connect('amqp://192.168.99.100', function(err, conn) {
// 	conn.createChannel(function(err, ch) {
// 		var q = 'hello';

//     	ch.assertQueue(q, {durable: false});
//     	ch.sendToQueue(q, new Buffer('Hello World!'));
//     	console.log(" [x] Sent 'Hello World!'");
// 	});
// });

var QUEUE_ADDRESS = 'amqp://192.168.99.100'

amqp
	.connect(QUEUE_ADDRESS)
	.then(function(connection) {
  		return when(
  			connection.createChannel()
	  			.then(function(channel) {
			    var q = 'hello';
			    var msg = 'Hello World!';
			    var ok = channel.assertQueue(q, {durable: false});
	    		return ok.then(function(_qok) {
	      			channel.sendToQueue(q, new Buffer(msg));
	      			console.log(" [x] Sent '%s'", msg);
	      			return channel.close();
	    		});
	  		}))
  			.ensure(function() { connection.close(); });
	})
	.then(null, console.warn);