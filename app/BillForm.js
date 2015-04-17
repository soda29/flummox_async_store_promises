require("babel/polyfill");
var React = require('react');
var _ = require('lodash');

class API {
    constructor() {
    }

    get(url, qs) {
        return new Promise( function(resolve,reject){
            resolve([{id: 1, name: 'Data4 Name 1'}, {id: 2, name: 'Data1 Name 4'}, ]);
        } );
    }

    async getNow() {
        return await this.get();
    }

}

var Api = new API();


export class BillForm extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        if (this.props.data1.length > 0) {
            var data1 = this.props.data1.map(function(data, keyId){
                return (<div key={'data1-'+keyId} onClick={function(){console.log('clicked!!!')}}>{data.name} - onClick event does not work</div>);
            })
        }
        else {
            var data1 = [(<div key={'none1'} onClick={function(){console.log('clicked!!!')}}>No data 1</div>)];
        }
        if (this.props.data2.length > 0) {
            var data2 = this.props.data2.map(function(data, keyId){
                return (<div key={'data2-'+keyId} onClick={function(){console.log('clicked!!!')}}>{data.name}</div>);
            })
        }
        else {
            var data2 = [(<div key={'none2-'} onClick={function(){console.log('clicked!!!')}}>No data 2</div>)];
        }
        if (this.props.data3.length > 0) {
            var data3 = this.props.data3.map(function(data, keyId){
                return (<div key={'data3-'+keyId} onClick={function(){console.log('clicked!!!')}}>{data.name}</div>);
            })
        }
        else {
            var data3 = [(<div key={'none3-'} onClick={function(){console.log('clicked!!!')}}>No data 3</div>)];
        }
        if (this.props.data4.length > 0) {
            var data4 = this.props.data4.map(function(data, keyId){
                return (<div key={'data4-'+keyId} onClick={function(){console.log('clicked!!!')}}>{data.name}</div>);
            })
        }
        else {
            var data4 = [(<div key={'none4-'} onClick={function(){console.log('clicked!!!')}}>No data 4</div>)];
        }
        return (
            <div>
            {data1}
            {data2}
            {data3}
            {data4}
            </div>
        );
    }
}

BillForm.defaultProps = { data4: Api.getNow() };