(function() {
	'use strict';
	angular.module('app')
	.controller('UserController', UserController);

	UserController.$inject = ['UserFactory', '$state', '$rootScope', '$window'];

	function UserController(UserFactory, $state, $rootScope, $window) {
		var vm = this;
		
		vm.register = function() {
			UserFactory.register(vm.user).then(function() {
				vm.user = {};
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function(res) {
				if(res) {
					vm.confirm = res;
				} else {
					vm.status = $rootScope._user;
					$state.go('Home')
				}
			})		
		};

		vm.logout = function() {
			UserFactory.logout() ;
			vm.status = $rootScope._user;
			$window.location.reload();
			$state.go('Home');
		} ;

	}
})();