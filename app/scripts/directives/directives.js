
var cal_template="";
cal_template += "<div id=\"cal\" data-ng-init=\"init()\">";
cal_template += "";
cal_template += "	<!--<button disabled>Today<\/button><button data-ng-click=\"perviousMonth()\">&lt;<\/button><button data-ng-click=\"nextMonth()\">&gt;<\/button> -->";
cal_template += "	<table class=\"cal-header\">";
cal_template += "		<tbody>";
cal_template += "			<tr>";
cal_template += "				<td class=\"cal-header-left\">";
cal_template += "					<h1>{{cal_heading}}<\/h1>";
cal_template += "				<\/td>";
cal_template += "				<td class=\"cal-header-center\">";
cal_template += "";
cal_template += "				<\/td>";
cal_template += "				<td class=\"cal-header-right\">";
cal_template += "					<button disabled>Today<\/button>";
cal_template += "					<button data-ng-click=\"perviousMonth()\">&lt;<\/button>";
cal_template += "					<button data-ng-click=\"nextMonth()\">&gt;<\/button>";
cal_template += "				<\/td>";
cal_template += "			<\/tr>";
cal_template += "		<\/tbody>";
cal_template += "	<\/table>";
cal_template += "	<table class=\"cal-tbl\">";
cal_template += "		<thead>";
cal_template += "			<tr>";
cal_template += "				<th class=\"cal-day-header\" data-ng-repeat=\"day in days_of_week\">{{day}}<\/th>";
cal_template += "				<!--Day 1 of 7 -->";
cal_template += "			<\/tr>";
cal_template += "		<\/thead>";
cal_template += "		<tbody>";
cal_template += "			<tr data-ng-repeat=\"days in dates\">";
cal_template += "				<td data-ng-repeat=\"day in days\" style=\"border: 1px solid #000;\" class=\"ng-class:isToday(day)\">";
cal_template += "					{{formatDate(day)}}";
cal_template += "					<calday data-ng-date=\"formatDate(day)\" get-data-fn=\"getDataFn()\"><\/calday>";
cal_template += "				<\/td>";
cal_template += "			<\/tr>";
cal_template += "		<\/tbody>";
cal_template += "	<\/table>";
cal_template += "";
cal_template += "<\/div>";



var day_template="";
day_template += "<div>";
day_template += "	<div class=\"cal-day-number\"> ";
day_template += "		{{ dateObj.getDate() }}";
day_template += "	<\/div>";
day_template += "	{{ scheduledClasss[dateObj.getDate()] }}";
day_template += "<\/div>";

var app = angular.module('calendarApp');

	app.directive('cal', function() {
    return {
    	restrict: "E",
    	replace:true,
    	template: cal_template,//Url: 'views/calendar/calendar_template.html',
        link: function(scope, elm, attrs, ctrl) {
        	scope.today = new Date(), selected_Date = null;	
  
		var days_of_week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		scope.days_of_week = days_of_week;

		var months = ['January', 'February', 'March', 'April','May', 'June', 
					'July', 'August', 'September','October', 'November', 'December'];
				scope.month_labels = months;
		var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	
        //function formatDate(date)
		scope.formatDate = function(date) {
			var date_num = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			var day_num = date.getDay();
			var month_num = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;//date.getMonth();
			var fullYear_num =  date.getFullYear();
			//return days_of_week[day_num]+", "+date_num+ " of "+months[month_num]+" "+fullYear_num;
			 
			return fullYear_num+"-"+month_num+"-"+date_num;
			//return '2013-10-01';
			
		}
		scope.getDayOfWeekIndex= function (date){

			return date.getDay();
		}

        
		
		//Caluclated vars
		scope.getFirstDateOfMonth = function(date){
			return new Date(date.getFullYear(), 
							date.getMonth(), 
							1);
		}

		
		scope.getLastDateOfMonth=function(date){
			return new Date(date.getFullYear(),
							date.getMonth(), 
							days_in_month[date.getMonth()]);
		}
		scope.getLastDatePerviousMonth=function(date){
			var monthIndex = date.getMonth() -1;
			return new Date(date.getFullYear(), 
							monthIndex,
							days_in_month[monthIndex]);
		}
		scope.getFirstDateNextMonth=function(date){
			return new Date(date.getFullYear(), 
							date.getMonth()+1,
							1);
		}
		
		scope.getPerviousMonthDays=function(date){
			var pervious_month_days = [];
			//get day index for 1st day of current month
			var first_ofCurrentMonth = scope.getFirstDateOfMonth(date);
			var day_index = first_ofCurrentMonth.getDay();
			var decrementer = 1;
			for (var i = day_index; i>0 ; i--){
				var tempDate = new Date(first_ofCurrentMonth);
				tempDate.setDate(tempDate.getDate()-decrementer);
				decrementer++;
				pervious_month_days.push(tempDate);
			}
			return pervious_month_days.reverse();

		}

		scope.getNextMonthDays=function(date){
			var next_month_days = [];
			var lastDay = scope.getLastDateOfMonth(date);
			var lastDayIndex = lastDay.getDay();
			var day_index = 7 - lastDayIndex;//getDayOfWeekIndex(scope.getLastDateOfMonth(date));
			var incrementer = 1
			for(var i = lastDayIndex+1; i < 7 ; i++ ){
				var tempDate = new Date(scope.getLastDateOfMonth(date));
				tempDate.setDate(tempDate.getDate()+incrementer);
				incrementer++;
				
				
				next_month_days.push(tempDate);
			}		
			return next_month_days;
		}
		
		scope.getDaysToRender=function(date){
			//pervious month days = date - current days 
			var pervious_month_days = scope.getPerviousMonthDays(date);

			//for(var i=1 ; i<= ){}
			var current_month_days= [];
			var str = scope.formatDate(date);
			for(var i = 0 ;i<days_in_month[date.getMonth()]; i++ ){
				var tempDate = new Date(date.getFullYear(), 
										date.getMonth(), 
										1);
				tempDate.setDate(tempDate.getDate()+i);
				current_month_days.push(tempDate);
			}

			var next_month_days = scope.getNextMonthDays(date);
			cal_days = []

			cal_days.push.apply(cal_days, pervious_month_days);
			cal_days.push.apply(cal_days, current_month_days);
			cal_days.push.apply(cal_days, next_month_days);

			return cal_days;
		}

		scope.perviousMonth = function(){
			selected_Date = new Date(selected_Date.getFullYear(),selected_Date.getMonth()-1, 1 );
			scope.setCalendarDates(selected_Date);
			scope.date = scope.formatDate(selected_Date);
			scope.cal_heading = months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();

		}
		scope.nextMonth = function(){
			selected_Date = new Date(selected_Date.getFullYear(),selected_Date.getMonth()+1, 1 );
			scope.setCalendarDates(selected_Date);
			scope.date = scope.formatDate(selected_Date);
			scope.cal_heading = months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();
		}

		init = function(){
		
				//if(date == undefined ) selected_Date = new Date();
			//else selected_Date = date;
			
			if(attrs.ngCurrentDate == undefined){
				selected_Date = new Date(2013, 9, 1);
   			}
   			else{
   				selected_Date = new Date(attrs.ngCurrentDate);
   			}
   		
			scope.setCalendarDates(selected_Date);
			scope.date = scope.formatDate(selected_Date);
			scope.cal_heading = months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();

			
			
		}
		
		scope.setCalendarDates=function(date){

			var allDates_singleArray = scope.getDaysToRender(date);
			var allDates_multiArray = [];
			for(var i =0; i< allDates_singleArray.length; i++){
				if(i %7 == 0 )allDates_multiArray.push([]);
				allDates_multiArray[allDates_multiArray.length-1].push(allDates_singleArray[i]);
			}

			scope.dates = allDates_multiArray;
			
	}
		scope.isToday=function(date){
			var today = new Date();
    		if(scope.formatDate(date) ==scope.formatDate(today)){
    			return true; 
    		}
    		return false;
    	}

    	init();



    }
}
	});

app.directive('calday', function() {
	return {
    	restrict: "E",
    	replace:false,
    	template:day_template,//Url: 'views/calendar/day_template.html',
    	scope:{
    		date: "=ngDate",
    		getDataFn : '&'
    	},
    	link:function(scope, elm, attrs, ctrl){
    		scope.day_date = scope.date;//attrs.ngDate;
    		scope.dateObj = new Date (scope.date);
    	
    		scope.classes=[{time:"7:30", name:"S&C", noOfAttendees:6},
    						{time:"17:00", name:"S&C", noOfAttendees:9},
    						{time:"18:00", name:"S&C", noOfAttendees:5},
    						{time:"19:00", name:"S&C", noOfAttendees:7}];

    		 //scope.getDataFn();
    		scope.scheduledClasses = scope.getDataFn();
    		/*[
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
	]*/

    	}


    }

});

app.factory("scheduledClassFactory", function(){

	var classesObject = 
	{		    
		'07:30':{
	        'instructor' : 'Cian',
	        'time':'17:00',
	        'duration': '60',
	        'students':['Ann','Mary','Joe','Laura'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        },
	    '08:30':{
	        'instructor' : 'Cian',
	        'time':'17:00',
	        'duration': '60',
	        'students':['Tim','Max','Pat','Todd'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        },
	    '17:00':{
	        'instructor' : 'James',
	        'time':'17:00',
	        'duration': '60',
	        'students':['Mick','Jax','Noal','Jane'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        },
	        '18:00':{
	        'instructor' : 'James',
	        'time':'18:00',
	        'duration': '60',
	        'students':['John','Tom','Dave','Sam'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        },
	        '19:00':{
	        'instructor' : 'James',
	        'time':'19:00',
	        'duration': '60',
	        'students':['Nick','Kay','Donal','Matt'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        },
	        '20:00':{
	        'instructor' : 'James',
	        'time':'20:00',
	        'duration': '60',
	        'students':['Jimmy','Angela','Carlos','Jess'],
	        'maxStudents':6,
	        'name':'S&C',
	        'Location':'Main',
	        'description':'This is a Strength & Conditioning Class',
	        'attachements':['workoutPlan.pdf','records.xls']
	        }
	}

	var classServiceObj={
		getClasses : function(){
			return classesObject;
		}
	}
	return classServiceObj;
});

app.factory("scheduleDayFactory", function(){//scheduledClassFactory

	var dates = [
		"2013-09-30",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-01",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-02",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-03",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-04",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-05",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-07",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-08",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-09",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-10",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-11",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-12",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-14",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-15",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-16",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-17",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-18",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-19",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-21",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-22",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-23",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-24",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-25",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-26",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-28",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-29",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-30",//,//: scheduledClassFactory.getClasses(), 
		"2013-10-31",//,//: scheduledClassFactory.getClasses(), 
		"2013-11-01",//,//: scheduledClassFactory.getClasses(), 
		"2013-11-02",//: scheduledClassFactory.getClasses()
	];

	var scheduleDayFactory = {
		getScheduledDays: function(){
			return dates;
		}
	}
	return scheduleDayFactory;
});

