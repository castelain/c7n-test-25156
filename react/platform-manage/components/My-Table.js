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
        this.getData({
            size: pagination.pageSize,
            page: pagination.current,
            level: 'site',
            params: []
        });
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
        return (
            <div>
                <Table rowSelection={rowSelection}
                    columns={roleManageStore.getRoleColumn}
                    dataSource={this.state.roleData}
                    pagination={this.state.pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }

    // getData() {
    //     let promiseRoleData = roleManageStore.getRoleDataPromise({ "level": "site", "params": [] });
    //     promiseRoleData.then((response) => {
    //         let roleList = response.list;
    //         for (let i = 0; i < roleList.length; i++) {
    //             roleList[i]['key'] = roleList[i].id;
    //             roleList[i].buildIn = roleList[i].buildIn ? <div><Icon type="settings" style={{ marginRight: '.05rem' }} />预定义</div> : <div><Icon type="av_timer" style={{ marginRight: '.05rem' }} />自定义</div>;
    //             roleList[i].enabled = roleList[i].enabled ? <div><Icon type="check_circle" style={{ color: 'rgb(0, 191, 165)', marginRight: '.05rem' }} />启用</div> : <div><Icon type="remove_circle" style={{ color: 'rgb(211, 211, 211)', marginRight: '.05rem' }} />停用</div>;
    //             if (roleList[i].level === 'site') {
    //                 roleList[i].level = '全局';
    //             } else if (roleList[i].level === 'organization') {
    //                 roleList[i].level = '组织';
    //             } else if (roleList[i].level === 'project') {
    //                 roleList[i].level = '项目';
    //             }
    //         }
    //         // console.log(roleList);
    //         this.setState({
    //             roleData: roleList,
    //             roleCount: response.total
    //         })
    //     });
    // }

    getData(params) {
        let promiseRoleData = roleManageStore.getRoleDataPromise(params);
        promiseRoleData.then((response) => {
            let roleList = response.list;
            for (let i = 0; i < roleList.length; i++) {
                roleList[i]['key'] = roleList[i].id;
                roleList[i].buildIn = roleList[i].buildIn ? <div><Icon type="settings" style={{ marginRight: '.05rem' }} />预定义</div> : <div><Icon type="av_timer" style={{ marginRight: '.05rem' }} />自定义</div>;
                roleList[i].enabled = roleList[i].enabled ? <div><Icon type="check_circle" style={{ color: 'rgb(0, 191, 165)', marginRight: '.05rem' }} />启用</div> : <div><Icon type="remove_circle" style={{ color: 'rgb(211, 211, 211)', marginRight: '.05rem' }} />停用</div>;
                if (roleList[i].level === 'site') {
                    roleList[i].level = '全局';
                } else if (roleList[i].level === 'organization') {
                    roleList[i].level = '组织';
                } else if (roleList[i].level === 'project') {
                    roleList[i].level = '项目';
                }
            }
            const pagination = { ...this.state.pagination };
            pagination.total = response.total;
            this.setState({
                loading: false,
                roleData: roleList,
                pagination,
            });
        });
    }

    componentDidMount() {
        let params = { "params": [], "page": 1, "size": 10 };
        this.getData(params);
    }
}

export default MyTable;