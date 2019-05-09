app.controller('listCtrl',function($scope,$http){

	$scope.list = [];

	$http({
		method:'POST',
		url:'control/getpersonCtrl.php',

	}).then(function successCallback(response){
		$scope.list = response.data;

		var arr=sortName($scope.list,DATA);
		console.log(arr);

		$scope.arr = arr;
		
	},function errorCallback(response){
          console.log(response);
	});


	
});