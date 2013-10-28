'use strict';

window.formatDate = function(date) {
			var date_num = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			var day_num = date.getDay();
			var month_num = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;//date.getMonth();
			var fullYear_num =  date.getFullYear();
			//return days_of_week[day_num]+", "+date_num+ " of "+months[month_num]+" "+fullYear_num;
			return fullYear_num+"-"+month_num+"-"+date_num;
	
		}
var app = angular.module('calendarApp');

app.controller('calController', function($scope, scheduleDayFactory){

	$scope.getDataFn = function(){ return [
		"2013-09-30",//: scheduledClassFactory.getClasses(), 
		"2013-10-01",//: scheduledClassFactory.getClasses(), 
		"2013-10-02",//: scheduledClassFactory.getClasses(), 
		"2013-10-03",//: scheduledClassFactory.getClasses(), 
		"2013-10-04",//: scheduledClassFactory.getClasses(), 
		"2013-10-05",//: scheduledClassFactory.getClasses(), 
		"2013-10-07",//: scheduledClassFactory.getClasses(), 
		"2013-10-08",//: scheduledClassFactory.getClasses(), 
		"2013-10-09",//: scheduledClassFactory.getClasses(), 
		"2013-10-10",//: scheduledClassFactory.getClasses(), 
		"2013-10-11",//: scheduledClassFactory.getClasses(), 
		"2013-10-12",//: scheduledClassFactory.getClasses(), 
		"2013-10-14",//: scheduledClassFactory.getClasses(), 
		"2013-10-15",//: scheduledClassFactory.getClasses(), 
		"2013-10-16",//: scheduledClassFactory.getClasses(), 
		"2013-10-17",//: scheduledClassFactory.getClasses(), 
		"2013-10-18",//: scheduledClassFactory.getClasses(), 
		"2013-10-19",//: scheduledClassFactory.getClasses(), 
		"2013-10-21",//: scheduledClassFactory.getClasses(), 
		"2013-10-22",//: scheduledClassFactory.getClasses(), 
		"2013-10-23",//: scheduledClassFactory.getClasses(), 
		"2013-10-24",//: scheduledClassFactory.getClasses(), 
		"2013-10-25",//: scheduledClassFactory.getClasses(), 
		"2013-10-26",//: scheduledClassFactory.getClasses(), 
		"2013-10-28",//: scheduledClassFactory.getClasses(), 
		"2013-10-29",//: scheduledClassFactory.getClasses(), 
		"2013-10-30",//: scheduledClassFactory.getClasses(), 
		"2013-10-31",//: scheduledClassFactory.getClasses(), 
		"2013-11-01",//: scheduledClassFactory.getClasses(), 
		"2013-11-02"//: scheduledClassFactory.getClasses()
	];
	}
});
