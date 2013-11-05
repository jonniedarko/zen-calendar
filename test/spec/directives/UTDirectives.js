'use strict';

describe('Directives calendar day', function() {

    var scope,
        html,
        elem,
        compiled;
  
    beforeEach(function(){

        // load the controller's module
        module('zenApp');

        // Initialize the controller and a mock scope
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
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
