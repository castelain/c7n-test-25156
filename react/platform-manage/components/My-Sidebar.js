import React, { Component } from 'react';
import { Modal, Button, Icon, Table } from 'choerodon-ui';
const { Sidebar } = Modal;
import { observer } from 'mobx-react';
import createRoleStore from '../../role/stores/create-role-store';

@observer
class MySidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	showModal = () => {
		createRoleStore.setVisible(!createRoleStore.visible);
	}

	handleOk = () => {
		createRoleStore.setVisible(false);
		// console.log('Record: ', this.props.record);
	}

	handleCancel = () => {
		createRoleStore.setVisible(false);
	}

	rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User', // Column configuration not to be checked
			name: record.name,
		}),
		selections: true,
	};

	columns = [
		{
			title: '权限',
			dataIndex: 'code',
			key: 'code'
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description'
		}
	];

	render() {
		return (
			<div>
				<div onClick={this.showModal}>
					<Button shape="circle" funcType="flat" icon="predefine" style={{ transform: 'scale(.9)' }} title='配置' />
				</div>
				<Sidebar
					title="菜单权限配置"
					visible={createRoleStore.visible}
					maskClosable={true}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					cancelText="取消"
					okText="确定"
					zIndex='10000'
					mask={false}
				>
					<div>
						<h2>配置菜单“{this.props.record.name}”的权限</h2>
						<p style={{ marginBottom: '.2rem' }}>
							您可以在此配置当前角色所分配菜单下的权限。<a href='#'><Icon type="input" style={{ margin: '0 .1rem' }} />了解更多</a>
						</p>
						<Table 
							rowSelection={this.rowSelection}
							columns={this.columns}
							dataSource={this.props.record.permissions}
							pagination={false}
							filterBar={false}
						/>,
					</div>
				</Sidebar>
			</div>
		);
	}
}

export default MySidebar;