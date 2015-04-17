require("babel/polyfill");
var React = require('react');
import { App } from './App';

import FluxComponent from 'flummox/component';
import { flux } from './flux';

React.render(
	<FluxComponent 
		flux={flux}
		render={() => <App flux={flux}/>}
	>
	</FluxComponent>,
	document.getElementById('main')
);
