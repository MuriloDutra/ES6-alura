class HttpService{

    get(url){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url); //A URL está assim pois o servidor é local
            xhr.onreadystatechange = () => { // toda vez que o estado de 'xhr' mudar, esta função será executada
                /**Estado de uma requisição AJAX
                 * 
                 * 0: requisição ainda não iniciada
                 * 1: conexão com o servidor estabelecidas
                 * 2: requisição recebida
                 * 3: processando requisição
                 * 4: requisição concluída e a resposta esta pronta */

                if(xhr.readyState == 4){
                    if(xhr.status == 200) //Quando a resposta for OK
                        resolve(JSON.parse(xhr.responseText)); //convertendo a resposta para JSON
                    else{
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) 
                        resolve(JSON.parse(xhr.responseText));
                    else
                        reject(xhr.responseText);
                }
            };
            
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string.
        });

    }
}