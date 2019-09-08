"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: "get",
        value: function get(url) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', url); //A URL está assim pois o servidor é local
                xhr.onreadystatechange = function () {
                    // toda vez que o estado de 'xhr' mudar, esta função será executada
                    /**Estado de uma requisição AJAX
                     * 
                     * 0: requisição ainda não iniciada
                     * 1: conexão com o servidor estabelecidas
                     * 2: requisição recebida
                     * 3: processando requisição
                     * 4: requisição concluída e a resposta esta pronta */

                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) //Quando a resposta for OK
                            resolve(JSON.parse(xhr.responseText)); //convertendo a resposta para JSON
                        else {
                                console.log(xhr.responseText);
                                reject(xhr.responseText);
                            }
                    }
                };
                xhr.send();
            });
        }
    }, {
        key: "post",
        value: function post(url, dado) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) resolve(JSON.parse(xhr.responseText));else reject(xhr.responseText);
                    }
                };

                xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string.
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=OldHttpService.js.map