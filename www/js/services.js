angular.module('holerite.services', [])

.service('Login', ['$http', function ($http) {
  return {
    // call to get dados do funcionário logado
    autenticar: function (loginData, result) {
      var config = {
        url: "https://api.apiluiza.com.br/v1/employees/" + loginData.user + "?system=134",
        method: "GET",
        headers: {
          "Authorization": "Bearer bsURpbfwAJ4HhmK2dtOHcHZ9UVt9",
          "user.password": btoa(loginData.password)
        }
      }

      $http(
        config
      ).then(
        function (xhr) {
          result(null, xhr.data.records[0]);
        },
        function (xhr) {
          result(xhr.data, null);
        });
    }
  }
}])

.service('Holerite', ['$http', function ($http) {
  return {    
    get: function (holeData, result) {
      return $http.get("http://10.31.0.243:10207/api/holerites/" + holeData.cdicontratado + "?ocorrencia=" + holeData.ocorrencia);
    }
  }
}]);