require("babel/polyfill");
var _ = require('lodash');
import { Store } from 'flummox';
// import { Api } from '../API';

export class BillingStore extends Store {

    constructor(flux) {
        super(); // Don't forget this step;
        this.flux = flux;
        const billingActionIds = flux.getActionIds('billing');
        this.registerAsync(billingActionIds.setData1, null, this.handleSetData1, this.handleSetData1Error);
        this.register(billingActionIds.setData2, this.handleSetData2);
        this.state = {
            data1: [],
            data2: [],
            data3: [{id: 10, name:'data 3 - 10 name'}, {id: 11, name:'data 3 - 11 name'}, ]
        };
    }
    handleSetData1(payload) {
        this.setState({
            data1: payload.data
        });
    }

    handleSetDataError(error) {
        console.error(error);
    }

    handleSetData2(payload) {
        this.setState({
            data2: payload.data
        });
    }

}
