# task :run_tests do 
# 	sh "ruby FridgeEditorialTimelineGateway.rb &"
# 	begin
# 		sh "ruby ./tests/superTest.rb"
# 	ensure
# 		sh "kill $(ps aux | grep 'ruby FridgeEditorialTimelineGateway.rb' | grep -v grep | awk '{print $2}')"
# 	end
# end

task :run_tests do 
	sh "node ../MobileEditorialTimelineGateway.js &"
	begin
		sleep 1
		sh "ruby ./tests/MobileTest.rb"
		sleep 5
	ensure
		sh "kill $(ps aux | grep 'node ../MobileEditorialTimelineGateway.js' | grep -v grep | awk '{print $2}')"
	end
end

task :default => [:run_tests]