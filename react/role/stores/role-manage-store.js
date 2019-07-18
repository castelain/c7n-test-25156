import { observable, computed, action } from 'mobx';
import React from 'react';
import { axios } from '@choerodon/boot';
import { Button } from 'choerodon-ui';

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
    @observable levelBtnObj =   {
        id: 0,
        name: '全局',
        code: 'site'
    };

    // 角色表格数据源
    // 表头列名数据
    @observable columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '层级',
            dataIndex: 'level',
            key: 'level'
        },
        {
            title: '来源',
            dataIndex: 'buildIn',
            key: 'buildIn'
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled'
        },
        {
            title: '',
            // dataIndex: 'operations',
            key: 'operations',
            render: (text, record) => (
                <Button shape="circle" funcType="flat" icon="more_vert" />
            )
        }
    ];

    // 返回对应请求层级的 Promise 对象
    @action
    getRoleDataPromise(params) {
        if(params.hasOwnProperty('page') && params.hasOwnProperty('size')) {
            let url = `${this.baseUrl}&page=${params.page}&size=${params.size}`;
            let data = {
                level: this.levelBtnObj.code,
                params: params.params
            };
            return axios.post(url, JSON.stringify(data));
        }else {
            return Promise.reject(new Error('Bad request: missing page or size!'));
        }
        
    }

    @action
    setLevelBtnObj(key) {
        this.levelBtnObj = this.getLevelData[key];
    }

    @computed
    get getRoleColumn() {
        return this.columns.slice();
    }

    @computed
    get getLevelData() {
        return this.levelData.slice();
    }
    
}

const roleManageStore = new RoleManageStore();
export default roleManageStore;