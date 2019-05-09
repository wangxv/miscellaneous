app.controller("top250Ctrl", function($scope) {
   
   


    // 请求数据
    $.ajax({
        url: "http://api.douban.com/v2/movie/in_theaters?alt=json",
        async: false,
        type: "GET",
        dataType: "jsonp",
        success: function(data) {
            $scope.data = data.subjects;
            $scope.$apply();
        }

    })
    
   
    var imgs = $(".img");
    // 数据的变换显示
    $scope.isShow = true;
    $scope.showChange = function(){
         console.log(this);
         $(imgs[(this.$index)]).css({
              "display":"block"
         })
    }  


    
})