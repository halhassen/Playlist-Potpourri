(function() {
	'use strict';
	angular.module('app')
	.controller('PlaylistController', PlaylistController);

	PlaylistController.$inject = ['PlaylistFactory', "$sce", "$scope"];

	function PlaylistController(PlaylistFactory, $sce, $scope) {
		var vm = this;
		vm.playlists = [];

		vm.createPlaylist = function(playlist) {
			vm.playlist = playlist
			console.log(vm.playlist)
			PlaylistFactory.createPlaylist(vm.playlist).then(function(res) {
				vm.playlist = {};
				$state.go('Home');
			});
		};

		vm.deletePlaylist = function(idx) {
			PlaylistFactory.deletePlaylist(idx).then(function(res) {
				vm.playlists.splice(idx, 1);
			});
		};

		vm.getUser = function(username) {
			PlaylistFactory.getUser(username).then(function(res) {
				console.log(res)
				vm.userData = res;
			});
		};

		vm.play = function(track_url) {
			console.log(track_url);
			SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
				$scope.$apply($scope.player_html = $sce.trustAsHtml(oEmbed.html));
			});
		};

	}
})();