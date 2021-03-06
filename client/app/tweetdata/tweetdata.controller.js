'use strict';

angular.module('linkedinFullstackApp')
  .controller('TweetdataCtrl', function ($scope, $http, User, d3, socket, $linkedIn, $state, Auth, ngDialog) {
   
    $scope.tweetUser = '';
    $scope.search = [1, 2, 3]

	
$scope.sendUser = function(username){
	var obj = {user: username, 
	           twitter: ''}
    $http.post('/api/twitters/', obj).success(function(data){
       $scope.tweetData = data
        $http.get('/api/twitters/'+ $scope.tweetData._id).success(function(data){
	    	$scope.twitterData = data
	    	$scope.twitterData.watsonData;
	    	$http.post('/api/users/getWatsonTweet', $scope.twitterData).success(function(data){
	    	console.log($scope.twitterData, 'tiwtter data')		
			    $http.get('api/twitters/'+ $scope.tweetData._id).success(function(data){
			    	$scope.twitterData = data
			    	
			    	d3.pieChart($scope.twitterData);

  

			    })
	    	})

    	})

   })
    // $scope.update(); 

   
}


// $scope.sendUser = function(username){
// 	var obj = {user: username, 
// 	           twitter: ''}
//     $http.post('/api/twitters/', obj).then(function(allTweets){
//        $scope.tweetData = allTweets.data; 
//        return allTweets.data
//    	}).then(function(allTweets){
//    		console.log('all tweets, ', allTweets)
//         $http.get('/api/twitters/'+ allTweets._id).then(function(singleTweet){
// 	    	singleTweet = singleTweet.data;
// 	    	singleTweet = singleTweet.watsonData; 
// 	    	$scope.twitterData = singleTweet.watsonData;
// 	    	return singleTweet;
// 	}).then(function(singleTweet){
//     	$http.post('/api/users/getWatsonTweet', singleTweet).then(function(watsonData){
//     		return watsonData.data; 
//     }).then(function(watsonData){
// 		$http.get('api/twitters/'+ watsonData._id).then(function(finalData){
// 		   	console.log(finalData, 'final console for watson data')
// 		})
// 	})
//     })	
// })

  

//     console.log($scope.twitterData)
//     $scope.update(); 
//     // d3.pieChart($scope.twitterData);
   
// }



		$scope.update = function() {
			$http.post('api/twitters/update', $scope.twitterData).success(function(data) {
				console.log("Update to database Complete")
			});
		}

		$scope.getWatsonData = function() {
			$scope.sendUser(); 


			  $http.get('/api/twitters/').success(function(data){ 
				$scope.profileInformation = data;
				console.log($scope.profileInformation, 'thisssssss callllllllllllllll' )
				var watsonDataSting = 'testing '

				while (watsonDataSting.split(' ').length < 200) {
					watsonDataSting += watsonDataSting
				}

				// console.log($scope.profileInformation)
				$scope.profileInformation.traitObj = watsonDataSting
				$scope.profileInformation.watsonData;
				$scope.update()


					//console.log('$scope.profileInformation.watsonData', $scope.profileInformation.watsonData)

				//console.log($scope.profileInformation.traitObj)


				// $http.post('/api/users/getWatson', $scope.profileInformation).success(function(data) {
				// 	console.log(data)

				// })
				// d3.pieChart($scope.profileInformation);
			})

		}
		  // $scope.getWatsonData()
		



$scope.data = {
      selectedIndex : 0,
      secondLocked : true,
      secondLabel : "Item Two"
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
  

  });
