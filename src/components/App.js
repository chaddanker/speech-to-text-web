import React, { useState } from 'react';
import Translate from './Translate';
import Route from './Route';

import './App.css';

export default () => {
	return (
		<div className="page">
			<div className="ui container" style={{textAlign: 'center'}}>
				<Route path="/">
					<h1 style={{ color: '#fafafa', margin: '0.75em auto', fontSize: window.innerWidth < 400 ? '2em' : '3em', fontFamily: `'Anton', sans-serif`, textTransform: 'uppercase'}}>amatranslate</h1>
					<Translate />
				</Route>
			</div>
		</div>
	);
};