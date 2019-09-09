export class HttpService{

    _handleErrors(res){
        if(res.ok)
            return res;

        throw new Error(res.statusText);
    }
    
    get(url){
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado){

        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado) // usando JSON.stringifly para converter objeto em uma string.
        })
        .then(res => this._handleErrors(res));
    }
}