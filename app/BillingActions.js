import * as _ from 'lodash';
import { Actions } from 'flummox';
import FluxComponent from 'flummox/component';

class API {
    constructor() {
    }

    get(url, qs) {
        return new Promise( function(resolve,reject){
            resolve([{id: 1, name: 'Data1 Name 1'}, {id: 2, name: 'Data1 Name 2'}, ]);
        } );
    }

    get2(url, qs) {
        return [{id: 1, name: 'Data2 Name 1'}, {id: 2, name: 'Data2 Name 2'}, ];
    }
}

var Api = new API();

export class BillingActions extends Actions {

    loadAllData(filters) {
        try {
            this.setData1(filters);
            this.setData2(filters);
        }
        catch (error) {
            console.error(error);
        }
    }

    async setData1(filters) {
        const data = await this.loadData1(filters);
        return await {data:data};
    }

    async loadData1(filters) {
        try {
            let res = await Api.get('/api/finance/data1', filters);
            return await res;
        }
        catch (error) {
            console.error(error);
        }
    }

    setData2(filters) {
        let data = this.loadData2(filters);
        return {data:data};
    }

    loadData2(filters) {
        let res = Api.get2('/api/finance/data2', filters);
        return res;
    }
}