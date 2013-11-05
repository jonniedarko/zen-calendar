
var app = angular.module('zenApp');

app.factory('timeSlotFactory', function () {

	return{
		getTimeslots: function(date){
			var slots = 
			{		    
			'07:30':{
		        'instructor' : 'Cian',
		        'time':'07:30',
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
		        'time':'08:30',
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

			return slots;
		},
		getInstructorDetails: function(id){
			var instructor = {
				name: 'John Smith',
				nickname: 'Smithy',
				email: 'john.smith@somewhere.com',
				mobile: '087-12348989',
				social: {
					facebook: 'fb.url',
					google: 'goo.url'
				},
				avatar: 'http://www.gravatar.com/avatar'
			}
		}

	}
});
