require "bundler/setup"
require 'bunny'
require 'test/unit'
require 'json'

class MobileTests < Test::Unit::TestCase
	def test_stuff
		event = {
			'payload' => {
				# 'tv-content-id' => 1
			}
		}
		send_event(event)




	end

	private
	def send_event(event)
		connection = Bunny.new('amqp://192.168.99.100')
		connection.start
		channel = connection.create_channel
		exchange = channel.fanout("newTimeline")
		exchange.publish(event.to_json)
		connection.close
	end
end




