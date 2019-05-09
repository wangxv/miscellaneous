 app.controller("bookCtrl", function($scope) {
     $scope.bookName = "";
     $scope.searchBook = function() {
         var url = "https://api.douban.com/v2/book/search?q=" + $scope.bookName + "&start=0&count=20&alt=json"
         $.ajax({
             url: url,
             async: true,
             type: "GET",
             dataType: "jsonp",
             success: function(data) {
                 $scope.data = data.books;
                  $scope.$apply();
             }
         })
     }
     $scope.imgShow = false;
     $scope.showBook = function(data){
         console.log(data);
         $scope.book = data;
          $scope.imgShow = true;
     }

 })