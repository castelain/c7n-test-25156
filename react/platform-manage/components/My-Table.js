import React, { Component } from 'react';
import { Table, Button } from 'choerodon-ui';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';
import Item from 'choerodon-ui/lib/list/Item';

@observer
class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            roleData: [],
            roleCount: 10,
        };
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Table rowSelection={rowSelection} columns={roleManageStore.getRoleColumn} dataSource={this.state.roleData} />
            </div>
        );
    }

    componentDidMount() {
        let promiseRoleData = roleManageStore.getRoleDataPromise({ "level": "site", "params": [] });
        promiseRoleData.then((response) => {
            let roleList = response.list;
            for (let i = 0; i < roleList.length; i++) {
                roleList[i]['key'] = roleList[i].id;
            }
            console.log(roleList);
            this.setState({
                roleData: roleList,
                roleCount: response.total
            })
        });
    }
}

export default MyTable;