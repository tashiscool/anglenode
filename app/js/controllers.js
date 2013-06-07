'use strict';

/* Controllers */


function HomeController($scope, $http, InstagramToken, instagram_search_url,userLikeBookUrl, userDisLikeBookUrl,
                        userNextUrl) {
    $scope.token = InstagramToken();


    $scope.userLike = function (bookisbn){
        var config = {
            params: {
                isbn : isbnStr,
                userid: hash.substr(hash.indexOf('=')+1),
                callback: 'JSON_CALLBACK'
            }
        };
        console.log($http.jsonp(userLikeBookUrl,config));
    };

    $scope.userDisLike = function (bookisbn){
        var config = {
            params: {
                isbn : isbnStr,
                userid: hash.substr(hash.indexOf('=')+1),
                callback: 'JSON_CALLBACK'
            }
        };
        console.log($http.jsonp(userDisLikeBookUrl,config));
        $scope.userNext();
    };

    $scope.userNext = function (){

        var successCallback = function(resp, status, headers, config){
            console.log(resp);
            $scope.book = resp.data;
        };
        var config2 = {
            params: {
                userid: hash.substr(hash.indexOf('=')+1),
                callback: 'JSON_CALLBACK'
            }
        };
        $http.jsonp(userNextUrl,config2).success(successCallback); //Get book with isbn and pass that
        $location.hash('').path('/samples');
    };

    $scope.userNext();

}
HomeController.$inject = ['$scope', '$http', 'InstagramToken', 'instagram_search_url','userLikeBookUrl',
    'userDisLikeBookUrl', 'userNextUrl'];

function InstagramAuthController($location, InstagramToken, userLikeBookUrl, userNextUrl, userCreateUrl){
    var hash = $location.search('ticket');
    console.log(hash);
    $scope.token = InstagramToken(hash.substr(hash.indexOf('=')+1));

    //get samlValidate link/redeem token for piId

    var piId = hash.substr(hash.indexOf('=')+1);


    var successCallback = function(resp, status, headers, config){
        console.log(resp);
        $scope.book = resp.data;
    };

    $scope.firstBook = function(isbnStr){
        var config = {
            params: {
                isbn : isbnStr,
                userid: piId,
                callback: 'JSON_CALLBACK'
            }
        };
        var config2 = {
            params: {
                userid: piId,
                callback: 'JSON_CALLBACK'
            }
        };

        //this is where we'd "create" the user in our cassandra
        //since our service is supporting upsert it would really just be that

        console.log($http.jsonp(userLikeBookUrl,config)); //Get book with isbn and pass that
        $http.jsonp(userNextUrl,config2).success(successCallback); //Get book with isbn and pass that
        $location.hash('').path('/samples');
    };
}
InstagramAuthController.$inject = ['$location', 'InstagramToken', 'userLikeBookUrl', 'userNextUrl'];