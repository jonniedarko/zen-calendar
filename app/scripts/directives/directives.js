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
    		date: "=ngDate"
    	},
    	link:function(scope, elm, attrs, ctrl){
    	}
    }
});

app.directive('timeslot', function() {
    return {
    	restrict: "E",
    	replace:true,
    	templateUrl: 'views/calendar/timeslot.html',
    	scope:{
    		timeslot: "=ngTimeslot",
    		date: "=ngDate",
            name: "=ngName",
            jsonObj: "=ngJsonobj"
    	},
        link: function(scope, elm, attrs, ctrl) 
        {
        
        },
        controller: 'timeSlotController'
    }
});
 

