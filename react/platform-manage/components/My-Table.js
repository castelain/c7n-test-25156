import React, { Component } from 'react';
import { Table, Icon } from 'choerodon-ui';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';

@observer
class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            roleData: [],
            pagination: {},
        };
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        let params = {
            size: pagination.pageSize,
            page: pagination.current,
            level: 'site',
            params: []
        };
        roleManageStore.setRoleData(params);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { loading, data, pagination } = roleManageStore.getRoleData;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Table rowSelection={rowSelection}
                    columns={roleManageStore.getRoleColumn}
                    dataSource={ data }
                    pagination={pagination }
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }

    componentDidMount() {
        roleManageStore.setRoleData({ "params": [], "page": 1, "size": 10 });
    }
}

export default MyTable;