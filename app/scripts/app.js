'use strict';

var app = angular.module('zenApp', ['ui.bootstrap']);

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
