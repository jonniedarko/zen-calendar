'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('zenApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('zenCalendarController', {
      $scope: scope
    });
  }));

  it('Calendar Directive function Tests', function() {
        var date = new Date('2013-10-27');
        console.log('Testing with date = ' + date);
        //var formattedDate = scope.formateDate(date);
        //console.log('date = '+date);
        //console.log('Formatted: '+);

        expect(scope.getDayOfWeekIndex(date)).toBe(0);
        //expect(scope.testMe()).toBe('testMe');
        expect(scope.formatDate(date)).toBe('2013-10-27');
        var first = scope.getFirstDateOfMonth(date);
        //console.log('first= '+scope.formatDate(first));
        var formatted_first = scope.formatDate(first);
        console.log('formatted_first ' + formatted_first);
        expect(formatted_first).toBe('2013-10-01');


        var lastDay = scope.formatDate(scope.getLastDateOfMonth(date));
        expect(lastDay).toBe('2013-10-31');


        var perviousLastDay = scope.formatDate(scope.getLastDatePerviousMonth(date));
        expect(perviousLastDay).toBe('2013-09-30');

        var nextMonthsFirstDate = scope.formatDate(scope.getFirstDateNextMonth(date));
        expect(nextMonthsFirstDate).toBe('2013-11-01');


        var isToday = scope.isToday(new Date());
        expect(isToday).toBe(true);


    });

    it('Calendar: getPerviousMonthDays function Tests', function() {

        var date = new Date('2013-10-27');
        var days = [];
        days = scope.getPerviousMonthDays(date);


        expect(days.length).toBe(2);

    });

    it('Calendar: getNextMonthDays function Tests', function() {

        var date = new Date('2013-10-27');
        var days = [];
        days = scope.getNextMonthDays(date);
      

        expect(days.length).toBe(2);

    });

    it('Calendar: getDaysToRender function Tests', function () {

        var date = new Date('2013-10-27');
        var days = [];
        days = scope.getDaysToRender(date);
        

        expect(days.length).toBe(35); 
    });

    it('Calendar: setCalendarDates function Tests', function () {

        var date = new Date('2013-10-27');
        var days = [];
        scope.setCalendarDates(date);
        days = scope.dates;
        expect(days.length).toBe(5); 
        expect(days[1].length).toBe(7); 
    });



});
