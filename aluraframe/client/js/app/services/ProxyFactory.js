class ProxyFactory{

    static create(objeto, props, acao){
        return  new Proxy(objeto, {
                    get (target, prop, receiver){
                        console.log(`Interceptado ${prop}`);
                        if(props.includes(prop) && ProxyFactory._verificaSeEFuncao(target[prop])){
                            return function(){
                                Reflect.apply(target[prop], target, arguments); // 1º função, 2º contexto/this, 3º parâmetros da função original
                                return acao(target); //um possível retorno
                            }
                        }   
                        return Reflect.get(target, prop, receiver);
                    },
                    set (target, prop, value, receiver){
                        if(props.includes(prop)){
                            target[prop] = value;
                            acao(target);
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
    }

    static _verificaSeEFuncao(func){
        return typeof(func) == typeof(Function);
    }
}