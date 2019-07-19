import { observable, computed, action } from 'mobx';
import React from 'react';
import { axios } from '@choerodon/boot';
import { Button, Icon, Input } from 'choerodon-ui';

class RoleManageStore {
    // 角色管理页面二级菜单数据
    @observable partName = '角色管理';

    @observable title = '平台"Choerodon"的角色管理';

    @observable description = '角色是您可分配给成员的一组权限。您可以创建角色并为其添加权限，也可以复制现有角色并调整其权限。';

    // 角色数据请求基础地址
    @observable baseUrl = '/iam/v1/roles/search?sort=id,desc';

    // 用于存储角色数据
    @observable roleData = [];

    // 切换 role 数据的 level 数据源
    @observable levelData = [
        {
            id: 0,
            name: '全局',
            code: 'site'
        },
        {
            id: 1,
            name: '组织',
            code: 'organization'
        },
        {
            id: 2,
            name: '项目',
            code: 'project'
        }
    ];
    // level 下拉框按钮数据源
    @observable levelBtnObj = {
        id: 0,
        name: '全局',
        code: 'site'
    };

    // 角色表格数据源
    // // 表头列名数据
    // @observable columns = [
    //     {
    //         title: '名称',
    //         dataIndex: 'name',
    //         key: 'name',
    //         filterDropdown: (
    //             <div className="custom-filter-dropdown">
    //                 <Input
    //                     ref={ele => this.searchInput = ele}
    //                     placeholder="Search name"
    //                     value={this.state.searchText}
    //                     onChange={this.onInputChange}
    //                     onPressEnter={this.onSearch}
    //                 />
    //                 <Button type="primary" onClick={this.onSearch}>Search</Button>
    //             </div>
    //         ),
    //         filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
    //         filterDropdownVisible: this.state.filterDropdownVisible,
    //         onFilterDropdownVisibleChange: (visible) => {
    //             this.setState({
    //                 filterDropdownVisible: visible,
    //             }, () => this.searchInput && this.searchInput.focus());
    //         },
    //     },
    //     {
    //         title: '编码',
    //         dataIndex: 'code',
    //         key: 'code'
    //     },
    //     {
    //         title: '层级',
    //         dataIndex: 'level',
    //         key: 'level'
    //     },
    //     {
    //         title: '来源',
    //         dataIndex: 'buildIn',
    //         key: 'buildIn'
    //     },
    //     {
    //         title: '状态',
    //         dataIndex: 'enabled',
    //         key: 'enabled'
    //     },
    //     {
    //         title: '',
    //         // dataIndex: 'operations',
    //         key: 'operations',
    //         render: (text, record) => (
    //             <Button shape="circle" funcType="flat" icon="more_vert" />
    //         ),
    //         filters: [{
    //             text: 'London',
    //             value: 'London',
    //         }, {
    //             text: 'New York',
    //             value: 'New York',
    //         }],
    //         onFilter: (value, record) => record.address.indexOf(value) === 0,
    //     }
    // ];

    // 存储角色数据
    @observable roleData = {};

    // 返回对应请求层级的 Promise 对象
    @action
    getRoleDataPromise(params) {
        if (params.hasOwnProperty('page') && params.hasOwnProperty('size')) {
            let url = `${this.baseUrl}&page=${params.page}&size=${params.size}`;
            let data = {
                level: this.levelBtnObj.code,
                params: params.params
            };
            return axios.post(url, JSON.stringify(data));
        } else {
            return Promise.reject(new Error('Bad request: missing page or size!'));
        }

    }

    @action
    setLevelBtnObj(key) {
        this.levelBtnObj = this.getLevelData[key];
    }

    @action
    setRoleData(value) {
        this.roleData = value;
    }

    // @computed
    // get getRoleColumn() {
    //     return this.columns.slice();
    // }

    @computed
    get getLevelData() {
        return this.levelData.slice();
    }

    @computed
    get getRoleData() {
        // console.log(this.roleData);
        if (this.roleData === {}) {
            this.setRoleData();
            // this.roleData.data = this.roleData.data.slice();
        }
        // let roleData = this.roleData;
        // roleData.data = roleData.data.slice();
        return this.roleData;
    }

    @action
    setRoleData(params) {
        params = params || { "params": [], "page": 1, "size": 10 };
        let promiseRoleData = roleManageStore.getRoleDataPromise(params);
        promiseRoleData.then((response) => {
            let roleList = response.list;
            for (let i = 0; i < roleList.length; i++) {
                roleList[i]['key'] = roleList[i].id;
                roleList[i].buildIn = roleList[i].buildIn ? <p><Icon type="settings" style={{ marginRight: '.05rem' }} />预定义</p> : <div><Icon type="av_timer" style={{ marginRight: '.05rem' }} />自定义</div>;
                roleList[i].enabled = roleList[i].enabled ? <p><Icon type="check_circle" style={{ color: 'rgb(0, 191, 165)', marginRight: '.05rem' }} />启用</p> : <div><Icon type="remove_circle" style={{ color: 'rgb(211, 211, 211)', marginRight: '.05rem' }} />停用</div>;
                if (roleList[i].level === 'site') {
                    roleList[i].level = '全局';
                } else if (roleList[i].level === 'organization') {
                    roleList[i].level = '组织';
                } else if (roleList[i].level === 'project') {
                    roleList[i].level = '项目';
                }
            }
            const pagination = {};
            pagination.total = response.total;
            let data = {
                loading: false,
                data: roleList,
                pagination,
            };
            this.roleData = data;
        });
    }
}

const roleManageStore = new RoleManageStore();
export default roleManageStore;