app.controller("top250Ctrl", function($scope) {
    $.ajax({
        url: "http://api.douban.com/v2/movie/top250?alt=json",
        async: false,
        type: "GET",
        dataType: "jsonp",
        success: function(data) {
           
            
            $scope.data = data.subjects;
            $scope.$apply();
        }

    })
})

