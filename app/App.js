require("babel/polyfill");
var React = require('react');

import FluxComponent from 'flummox/component';
import { BillForm } from './BillForm';


export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <FluxComponent connectToStores={['billing']}>
                    <BillForm />
                </FluxComponent>
            </div>
        );
    }

}
