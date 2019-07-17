import React, { Component } from 'react';
import { Modal, Icon } from 'choerodon-ui';
const { Sidebar } = Modal;
import { observer } from 'mobx-react';
import myHeaderStore from '../../role/stores/my-header-store';

@observer
class MySidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	showModal = () => {
		myHeaderStore.setVisible(!myHeaderStore.visible);
	}

	handleOk = () => {
		myHeaderStore.setVisible(false);
	}

	handleCancel = () => {
		myHeaderStore.setVisible(false);
	}

	render() {
		return (
			<div style={{ color: 'white' }}>
				<div onClick={ this.showModal }>
					<Icon type="notification_setting" />
				</div>
				<Sidebar
					style={{ marginTop: '.5rem'}}
					title="消息列表"
					visible={ myHeaderStore.visible }
					onOk={ this.handleOk }
					onCancel={ this.handleCancel }
					cancelText="取消"
					okText="确定"
					mask={ false }
					// zIndex={ -10 }
				>
					{
						myHeaderStore.getMessages.map(({ id, content }) => (
							<p key={ id }>{ content }</p>
						))
					}
				</Sidebar>
			</div>
		);
	}
}

export default MySidebar;