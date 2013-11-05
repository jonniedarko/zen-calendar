var app = angular.module('zenApp');

	app.directive('cal', function() {
    return {
    	restrict: "AE",
    	replace:true,
    	templateUrl: 'views/calendar/calendar_template.html',
    	controller: 'zenCalendarController'
    }
});


app.directive('calday', function() {
	return {
    	restrict: "E",
    	replace:false,
    	templateUrl: 'views/calendar/day_template.html',
    	controller: 'ZenDayController',
    	scope:{
    		date: "=ngDate",//,
    		//getDataFn : '&'
    	},
    	link:function(scope, elm, attrs, ctrl){

            //scope.day_date = scope.date;//attrs.ngDate;
            //scope.dateObj = new Date (scope.date);

    		/*scope.date = attrs.ngDate;
    		console.log("attrs.ngDate: "+ attrs.ngDate);
    		scope.day_date = scope.date;//attrs.ngDate;
    		scope.dateObj = new Date (scope.date);*/
    	/*
    		scope.classes=[{time:"7:30", name:"S&C", noOfAttendees:6},
    						{time:"17:00", name:"S&C", noOfAttendees:9},
    						{time:"18:00", name:"S&C", noOfAttendees:5},
    						{time:"19:00", name:"S&C", noOfAttendees:7}];

    		 //scope.getDataFn();
    		scope.scheduledClasses =//= scope.getDataFn();
    		[
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
		*/
    	}


    }

});

app.directive('timeslot', function() {
    return {
    	restrict: "E",
    	replace:true,
    	templateUrl: 'views/calendar/schedule_block.html',//Url: 'views/calendar/calendar_template.html',
    	scope:{
    		timeslot: "=ngTimeslot",
    		date: "=ngDate"
    	},
        link: function(scope, elm, attrs, ctrl) 
        {
        	console.log("date: "+scope.date );
        },
        controller: 'timeSlotController'
    }
});
 

