import { Flummox, Flux } from 'flummox';

import { BillingStore } from  './BillingStore';
import { BillingActions } from './BillingActions';

class AppFlux extends Flux {
    async constructor() {
        super();

        this.createActions('billing', BillingActions);
        this.createStore('billing', BillingStore, this);
        this._actions.billing.loadAllData();
    }
}

export const flux = new AppFlux();