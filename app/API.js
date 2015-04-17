var requests = require('superagent');

//export default class MyComponent { // Si no ponemos el default el transpiler va a tirar el error: TypeError: Cannot read property 'toUpperCase' of undefined
class API {
    constructor() {
    }

    get(url, qs) {
        return new Promise( function(resolve,reject){
            resolve([{id: 1, name: 'Data1 Name 1'}, {id: 2, name: 'Data1 Name 2'}, ]);
        } );
    }

    get2(url, qs) {
        return new Promise( function(resolve,reject){
            resolve([{id: 1, name: 'Data2 Name 1'}, {id: 2, name: 'Data2 Name 2'}, ]);

        } );
    }
}

export const Api = new API();