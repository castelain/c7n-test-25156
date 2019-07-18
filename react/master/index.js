import React, { Component } from 'react';
import MyHeader from './My-Header';
import '../styles/global.less';

export default class Master extends Component {
	render() {
		const { AutoRouter } = this.props;
		return (
			<div>
				<MyHeader />
				<div style={{ marginTop: '.34rem' }}>&nbsp;</div>
				<AutoRouter />
			</div>
		);
	}
}