(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'templates/home.html',
			controller: 'PlaylistController',
			controllerAs: 'vm'
		}).state('Register', {
			url:'/register',
			templateUrl: 'templates/register.html',
			controller: 'UserController',
			controllerAs: 'vm'
		})

		$urlRouterProvider.otherwise('/');
	}
})();
