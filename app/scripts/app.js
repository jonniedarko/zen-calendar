'use strict';

var app = angular.module('zenApp', ['ui.bootstrap']);

app.config(function ($provide) {
	$provide.decorator('$controller', function ($delegate, tempUserAuthenticationFactory) {
		return function (constructor, locals) {
			var days_of_week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var months = ['January', 'February', 'March', 'April','May', 'June', 
					'July', 'August', 'September','October', 'November', 'December'];
			var number_of_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			locals.$scope.days_of_week = days_of_week;
			locals.$scope.months = months;
			locals.$scope.number_of_days_in_month=number_of_days_in_month;
			locals.$scope._UserService = tempUserAuthenticationFactory;
			return $delegate(constructor, locals);
		};
	});
});

app.run(function ($rootScope){
	$rootScope.formatDate = function(date) {
			var date_num = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			var day_num = date.getDay();
			var month_num = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;//date.getMonth();
			var fullYear_num =  date.getFullYear();
			//return days_of_week[day_num]+", "+date_num+ " of "+months[month_num]+" "+fullYear_num;
			return fullYear_num+"-"+month_num+"-"+date_num;
	
		}
	});
