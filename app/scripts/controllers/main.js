'use strict';

var app = angular.module('zenApp');

app.controller('zenCalendarController', function ($scope) 
{
	//console.log("UserService is logged in: "+ $scope._UserService.getUserSchedule());
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.today = new Date();
    var selected_Date = null;	
  
		
		$scope.month_labels = $scope.months;
		var days_in_month = $scope.number_of_days_in_month;
	
        //function formatDate(date)
		$scope.formatDate = function(date) {
			var date_num = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			var day_num = date.getDay();
			var month_num = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;//date.getMonth();
			var fullYear_num =  date.getFullYear();
			//return days_of_week[day_num]+", "+date_num+ " of "+months[month_num]+" "+fullYear_num;
			 
			return fullYear_num+"-"+month_num+"-"+date_num;
			//return '2013-10-01';
			
		}
		$scope.getDayOfWeekIndex= function (date){

			return date.getDay();
		}

        
		
		//Caluclated vars
		$scope.getFirstDateOfMonth = function(date){
			return new Date(date.getFullYear(), 
							date.getMonth(), 
							1);
		}

		
		$scope.getLastDateOfMonth=function(date){
			return new Date(date.getFullYear(),
							date.getMonth(), 
							days_in_month[date.getMonth()]);
		}
		$scope.getLastDatePerviousMonth=function(date){
			var monthIndex = date.getMonth() -1;
			return new Date(date.getFullYear(), 
							monthIndex,
							days_in_month[monthIndex]);
		}
		$scope.getFirstDateNextMonth=function(date){
			return new Date(date.getFullYear(), 
							date.getMonth()+1,
							1);
		}
		
		$scope.getPerviousMonthDays=function(date){
			var pervious_month_days = [];
			//get day index for 1st day of current month
			var first_ofCurrentMonth = $scope.getFirstDateOfMonth(date);
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

		$scope.getNextMonthDays=function(date){
			var next_month_days = [];
			var lastDay = $scope.getLastDateOfMonth(date);
			var lastDayIndex = lastDay.getDay();
			var day_index = 7 - lastDayIndex;//getDayOfWeekIndex($scope.getLastDateOfMonth(date));
			var incrementer = 1
			for(var i = lastDayIndex+1; i < 7 ; i++ ){
				var tempDate = new Date($scope.getLastDateOfMonth(date));
				tempDate.setDate(tempDate.getDate()+incrementer);
				incrementer++;
				
				
				next_month_days.push(tempDate);
			}		
			return next_month_days;
		}
		
		$scope.getDaysToRender=function(date){
			//pervious month days = date - current days 
			var pervious_month_days = $scope.getPerviousMonthDays(date);

			//for(var i=1 ; i<= ){}
			var current_month_days= [];
			var str = $scope.formatDate(date);
			for(var i = 0 ;i<days_in_month[date.getMonth()]; i++ ){
				var tempDate = new Date(date.getFullYear(), 
										date.getMonth(), 
										1);
				tempDate.setDate(tempDate.getDate()+i);
				current_month_days.push(tempDate);
			}

			var next_month_days = $scope.getNextMonthDays(date);
			var cal_days = []

			cal_days.push.apply(cal_days, pervious_month_days);
			cal_days.push.apply(cal_days, current_month_days);
			cal_days.push.apply(cal_days, next_month_days);

			return cal_days;
		}

		$scope.perviousMonth = function(){
			selected_Date = new Date(selected_Date.getFullYear(),selected_Date.getMonth()-1, 1 );
			$scope.setCalendarDates(selected_Date);
			$scope.date = $scope.formatDate(selected_Date);
			$scope.cal_heading = months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();

		}
		$scope.nextMonth = function(){
			selected_Date = new Date(selected_Date.getFullYear(),selected_Date.getMonth()+1, 1 );
			$scope.setCalendarDates(selected_Date);
			$scope.date = $scope.formatDate(selected_Date);
			$scope.cal_heading = months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();
		}

		 function init(){
		
				//if(date == undefined ) selected_Date = new Date();
			//else selected_Date = date;
			
			//if(attrs.ngCurrentDate == undefined){
				selected_Date = new Date(2013, 9, 1);
   			/*}
   			else{
   				selected_Date = new Date(attrs.ngCurrentDate);
   			}*/
   		
			$scope.setCalendarDates(selected_Date);
			$scope.date = $scope.formatDate(selected_Date);
			$scope.cal_heading = $scope.months[selected_Date.getMonth()]+" "+selected_Date.getFullYear();

			
			
		}
		
		$scope.setCalendarDates=function(date){

			var allDates_singleArray = $scope.getDaysToRender(date);
			var allDates_multiArray = [];
			for(var i =0; i< allDates_singleArray.length; i++){
				if(i %7 == 0 )allDates_multiArray.push([]);
				allDates_multiArray[allDates_multiArray.length-1].push(allDates_singleArray[i]);
			}

			$scope.dates = allDates_multiArray;
			
	}
		$scope.isToday=function(date){
			var today = new Date();
    		if($scope.formatDate(date) ==$scope.formatDate(today)){
    			return true; 
    		}
    		return false;
    	}

    	init();


  });


app.controller('ZenDayController', function ($scope, timeSlotFactory )
{
	$scope.day_date = $scope.date;//attrs.ngDate;
	//console.log("$scope.date = "+$scope.date);
    		$scope.dateObj = new Date ($scope.date);


    $scope.slots = timeSlotFactory.getTimeslots();

	

});





var count = 0;
app.controller('timeSlotController', function ($scope, UserService, timeSlotFactory) {
	//$scope.timeslot = "7pm";
	$scope.classname = $scope.jsonObj.name;
	//console.log("timeslot date: "+$scope.date);
	$scope.dateObj = $scope.$parent.dateObj;

	$scope.isAttending= function (time, date){
		var currentUser = $scope._UserService.getLoggedInUser();
		var bookedSlots = UserService.getUserSchedule(currentUser.id);
		var timeslots = timeSlotFactory.getTimeslots();
		//console.log("classes "+JSON.stringify(timeslots) );
		//console.log("$scope.date.getDay()"+$scope.date.getDay()+" ******* date.getDay()"+date.getDay());
		
			
			for(var i=0 ; i<bookedSlots.length; i++ ){
				//console.log("bookedSlots[i].Day"+bookedSlots[i].Day+" ******* date.getDay()"+date.getDay());
				if(bookedSlots[i].Day == date.getDay()){
					if(bookedSlots[i].time === time){
						//console.log("True :");
						return true;
						
					}
				}
			}

//console.log("$scope.date.getDay() "+$scope.date.getDay());
		
		}
	//$scope.isAttending('07:30', new Date());

	});


app.controller('ScheduledClassPopUpCtrl', function ($scope, $modal, $log){


  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'views/calendar/timeslot_popup.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        },
        classItems: function () {
        	return $scope.jsonObj;
        },
        date: function(){ return $scope.date; }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

});

var ModalInstanceCtrl = function ($scope, $modalInstance, items, classItems, date) {
	//console.log("jsonObj.time = "+jsonObj.time);
	$scope.scheduled_class = classItems;
	$scope.date = date;
	$scope.students = classItems.students;

 
  $scope.selected = {
    student: $scope.students[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.student);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

function tempClassObj(){
	var classObj = {
				'instructor' : 'James',
		        'time':'17:00',
		        'duration': '60',
		        'students':['Mick','Jax','Noal','Jane'],
		        'maxStudents':6,
		        'name':'S&C',
		        'Location':'Main',
		        'description':'This is a Strength & Conditioning Class',
		        'attachements':['workoutPlan.pdf','records.xls']
		    }
		    return classObj;
}
