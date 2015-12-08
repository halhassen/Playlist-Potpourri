(function() {
	'use strict';
	angular.module('app')
	.controller('NavController', NavController);

	NavController.$inject = ['$state', '$rootScope'];

	function NavController($state, $rootScope) {
		var vm = this;
		vm.uiRouterState = $state;
		vm.status = $rootScope._user;

		$("nav ul li").click(function(){
			var xcoord = $(this).data("xcoord");
			//using state? find a way to keep white bar on current state
			$("nav div").stop().animate({marginLeft:xcoord}, 100, "easeInOutExpo");
			$(this).addClass("active");
			$("nav ul li").not(this).removeClass("active");	
		});

		
	}
})();