'use strict';

angular.module('PPnet')
  .controller('PostLikeController', function($scope, ppSyncService, ppnetPostHelper, ppnetUser) {

    $scope.newLike = function(postId) {
      var user = ppnetUser.getUserData();

      var likeObject = ppnetPostHelper.createLikeObject(user, postId);

      console.log(likeObject);
      ppSyncService.postDocument(likeObject);
    };

    $scope.deleteLike = function(postId) {
      var userId = ppnetUser.getId();

      if (!angular.isUndefined($scope.likes[postId])) {
        for (var i = 0; i < $scope.likes[postId].length; i++) {
          var currentObject = $scope.likes[postId][i];
          if (currentObject.doc.user.id === userId) {
            $scope.likes[postId].splice(i, 1);
            ppSyncService.deleteDocument(currentObject.doc, true);
            return true;
          }
        }
      }
    };

    $scope.isLiked = function(postId) {
      var userId = ppnetUser.getId();

      if (!angular.isUndefined($scope.likes[postId])) {
        for (var i = 0; i < $scope.likes[postId].length; i++) {
          var currentObject = $scope.likes[postId][i];
          if (currentObject.doc.user.id === userId) {
            return true;
          }
        }
      }

      return false;
    };
  });