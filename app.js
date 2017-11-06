var app = angular.module('bank', ['ui.bootstrap']);

app.controller('MainCtrl', function($scope, $modal, $log) {

  var cleanAccount = function() {
    var account = {
      name: 'User#',
      startingBalace: 1000.00,
      runningBalance: 0
    }
    return account;
  };

   var cleanTransaction = function() {
    var transaction = {
      type: 'savings',
      amount: 0.00,
      description: ''
    }

    return transaction;
  };

  var transactions = [{
    amount: 100.00,
    id:2,
      description: 'Deposit',
    type: 'savings'
  }, {
    amount: 50.00,
      id:3,
    description: 'Withdraw',
    type: 'current'
  }, {
    amount: 25.26,
      id:4,
      description: 'Pizza',
    type: 'current'
  },

 , ];

 

  $scope.transaction = cleanTransaction();
  $scope.account = cleanAccount();

  $scope.transactionList = transactions;

  $scope.saveTransaction = function() {
    var amount = parseFloat($scope.transaction.amount);
    var id = parseFloat($scope.transaction.id);
    var num = parseFloat($scope.account.runningBalance);
    var answer = 0;
      var WithdrawAmount = parseFloat($scope.transaction.Wamount);
      var DepositAmount = parseFloat($scope.transaction.Damount);

      if ($scope.transaction.type === 'saving') {
          answer = num + amount;
          id= id+1;
      }
      $scope.FromDate = new Date();


    if ($scope.transaction.type === 'current') {
      answer = num + amount
        id= id+1;
    } else {
      answer = num - amount
    }
    $scope.account.runningBalance = answer;

    $scope.transaction.amount = amount;
    $scope.transaction.id = id;
    transactions.push($scope.transaction);
   // $scope.transaction = cleanTransaction();
  };
    $scope.showForm = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);

        var modalInstance = $modal.open({
            templateUrl: 'modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
        $scope.form = {}
        $scope.submitForm = function () {
            if ($scope.form.userForm.$valid) {
                console.log('user form is in scope');
                $modalInstance.close('closed');
            } else {
                console.log('userform is not in scope');
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

});


app.directive('moneywarn', function() {
  var staticWarningLevel = .2;

  return {
    restrict: 'A',
    scope: {
      val: '=moneywarn'
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue) {
        var startBalance = parseInt(attrs.startbalance);
        var warningLevel = startBalance * staticWarningLevel;
        if (newValue === warningLevel) {
          element.addClass('alert-warning');
           element.removeClass('alert-danger');
        } else if (newValue < warningLevel) {
          element.addClass('alert-danger');
        } else {
          element.removeClass('alert-warning');
          element.removeClass('alert-danger');
        }

      }, true);
    }
  }

});
