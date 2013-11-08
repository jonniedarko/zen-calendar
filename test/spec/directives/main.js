'use strict';

var templateStr="";
templateStr += "<div>";
templateStr += "    <div class=\"cal-day-number\"> ";
templateStr += "        {{ dateObj.getDate() }}";
templateStr += "    <\/div>";
templateStr += "    <timeslot data-ng-repeat=\"(name, obj) in slots\" data-ng-jsonobj=\"obj\" data-ng-date=\"dateObj\" data-ng-timeslot=\"name\"><\/timeslot>";
templateStr += "";
templateStr += "<\/div>";


describe('Directives calendar day', function() {

    var scope,
        html,
        elem,
        compiled;
  
    beforeEach(function(){

        // load the controller's module
        module('zenApp');

        // Initialize the controller and a mock scope
        inject(function($compile, $rootScope, $templateCache) {
            scope = $rootScope.$new();
            $templateCache.put('views/calendar/day_template.html',templateStr);
            html = '<calday data-ng-date="2013-10-24" ></calday>';
            elem = angular.element(html);
            compiled = $compile(elem);

            compiled(scope);

            scope.$digest();
        });
    });

    it('Temp Test', function() {
        expect(true).toBe(true);
    });

    


});