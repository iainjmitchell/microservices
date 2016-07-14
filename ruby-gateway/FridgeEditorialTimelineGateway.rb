require "bundler/setup"
require "bunny"
require 'sinatra'

class FridgeEditorialTimelinesGateway
	def initialize
		@view_store = Hash.new
	end

	def newTimeLine(newTimelineEvent)
		puts newTimelineEvent
	end

	def get(tvContentId)
		return @view_store[tvContentId] if @view_store.has_key? tvContentId
		{
			"experience" => "Nope"	
		}
	end
end

gateway = FridgeEditorialTimelinesGateway.new

get '/fridgetimelines/:contentId' do 
	content_id = params['contentId']
	gateway.get(content_id)
end

connection = Bunny.new('amqp://192.168.99.100')
connection.start

channel = connection.create_channel
exchange = channel.fanout("newTimeline")
queue = channel.queue("", :exclusive => true)

queue.bind(exchange)

puts " [*] Waiting for events"

begin
  queue.subscribe(:block => true) do |delivery_info, properties, body|
    gateway.newTimeLine(body)
  end
rescue Interrupt => _
  channel.close
  connection.close
end