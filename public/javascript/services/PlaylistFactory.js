(function() {
	'use strict';
	angular.module('app')
	.factory('PlaylistFactory', PlaylistFactory);

	PlaylistFactory.$inject = ['$http', '$q'];

	function PlaylistFactory($http, $q) {
		var o = {};
		
		o.getUser = function(username) {
			var q = $q.defer();
			$http.get('http://api.soundcloud.com/users/' + username + '/tracks.json?client_id=8a2b64488a5c1f890b33d29a2835773c').success(function(res) {
				q.resolve(res)
			});
			return q.promise;
		};

		return o;
	}
})();