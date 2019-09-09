import { ProxyFactory } from '../services/ProxyFactory';

export class Bind{

    constructor(model, view, ...props){
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        
        if(props[0] != 'texto')
            view.update(model);        

        return proxy;
    }
}