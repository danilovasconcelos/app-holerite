angular.module('holerite.controllers', ['angularUtils.directives.dirPagination'])

.controller('LoginCtrl', function ($scope, Login, $ionicPopup, $location, $state, $window, $cordovaToast) {
    $scope.loginData = {};

    $scope.autenticar = function () {
        Login.autenticar($scope.loginData, function (err, result) {
            if (err)
                $cordovaToast
                    .show('Login ou senha inválidos', 'short', 'bottom')
                    .then( function (success) {}, function (error) {
                        console.log(error);
                    });
            
            if(result){
                $scope.errorMessage = null;
                window.localStorage.setItem( 'user', JSON.stringify(result));
                console.log(JSON.parse(window.localStorage.getItem('user')));

                $state.go("periodos", {}, {
                    reload: true
                });

                $window.location.reload(true)
            }
            else{
                $cordovaToast
                    .show('Login ou senha inválidos', 'short', 'bottom')
                    .then( function (success) {}, function (error) {
                        console.log(error);
                    });
            }
        })
    };
})

.controller('PeriodoCtrl', function($scope, $window, Holerite) {

    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    $scope.messelecionado;
    $scope.msg = "";
    $scope.tab = {};
    $scope.pagamento;
    $scope.modalClass = "alert alert-success";
    $scope.trustedHtml = "";
    $scope.loading = false;

    $scope.holerite = function () {
        var date = $scope.messelecionado;
        date = new Date(date).toLocaleDateString('pt-BR', {  
            day : 'numeric',
            month : 'numeric',
            year : 'numeric'
        }
        ).split(' ').join('/');

        var dados = {cdicontratado: $scope.user.id, ocorrencia: date}
        Holerite.get(dados)
            .then(function(data) {
                $scope.pagamento = data.data.diffgram.NewDataSet;
                console.log($scope.pagamento);
                $scope.tab.PV = true;
                $scope.tab.PM = true;
                $scope.tab.DV = true;
                $scope.tab.DM = true;
                $scope.tab.PLR = true;
                
                if(!$scope.pagamento.PV){
                    $scope.tab.PV = false;
                }
                else{
                    for (i = 0; i < $scope.pagamento.PV.length; i++) { 
                        $scope.pagamento.PV[i].CRC_VLNVERBA = parseFloat($scope.pagamento.PV[i].CRC_VLNVERBA).toFixed(2);
                        $scope.pagamento.PV[i].DUC_VLNLIQUIDO = parseFloat($scope.pagamento.PV[i].DUC_VLNLIQUIDO).toFixed(2);
                    }
                }

                if(!$scope.pagamento.PM){
                    $scope.tab.PM = false;
                }
                else{
                    for (i = 0; i < $scope.pagamento.PM.length; i++) { 
                        $scope.pagamento.PM[i].CRC_VLNVERBA = parseFloat($scope.pagamento.PM[i].CRC_VLNVERBA).toFixed(2);
                        $scope.pagamento.PM[i].DUC_VLNLIQUIDO = parseFloat($scope.pagamento.PM[i].DUC_VLNLIQUIDO).toFixed(2);
                    }
                }

                if(!$scope.pagamento.DV){
                    $scope.tab.DV = false;
                }
                else{
                    for (i = 0; i < $scope.pagamento.DV.length; i++) { 
                        $scope.pagamento.DV[i].CRC_VLNVERBA = parseFloat($scope.pagamento.DV[i].CRC_VLNVERBA).toFixed(2);
                        $scope.pagamento.DV[i].DUC_VLNLIQUIDO = parseFloat($scope.pagamento.DV[i].DUC_VLNLIQUIDO).toFixed(2);
                    }
                }

                if(!$scope.pagamento.DM){
                    $scope.tab.DM = false;
                }
                else{
                    for (i = 0; i < $scope.pagamento.DM.length; i++) { 
                        $scope.pagamento.DM[i].CRC_VLNVERBA = parseFloat($scope.pagamento.DM[i].CRC_VLNVERBA).toFixed(2);
                        $scope.pagamento.DM[i].DUC_VLNLIQUIDO = parseFloat($scope.pagamento.DM[i].DUC_VLNLIQUIDO).toFixed(2);
                    }
                }

                if(!$scope.pagamento.PLR){
                    $scope.tab.PLR = false;
                }
                else{
                    for (i = 0; i < $scope.pagamento.PLR.length; i++) { 
                        $scope.pagamento.PLR[i].CRC_VLNVERBA = parseFloat($scope.pagamento.PLR[i].CRC_VLNVERBA).toFixed(2);
                        $scope.pagamento.PLR[i].DUC_VLNLIQUIDO = parseFloat($scope.pagamento.PLR[i].DUC_VLNLIQUIDO).toFixed(2);
                    }
                }
            });
    };
});