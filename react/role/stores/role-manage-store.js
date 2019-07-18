import { observable, computed, action } from 'mobx';
import { axios } from '@choerodon/boot';
import { Button } from 'choerodon-ui';

class RoleManageStore {
    // 角色管理页面二级菜单数据
    @observable partName = '角色管理';

    @observable title = '平台"Choerodon"的角色管理';

    @observable description = '角色是您可分配给成员的一组权限。您可以创建角色并为其添加权限，也可以复制现有角色并调整其权限。';

    // 角色数据请求地址
    @observable baseUrl = '/iam/v1/roles/search?page=1&size=10&sort=id,desc';

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
            dataIndex: 'operations',
            key: 'operations',
            render: (text, recored) => (
                <Button>操作</Button>
            )
        }
    ];

    // 返回对应请求层级的 Promise 对象
    @action
    getRoleDataPromise(params) {
        return axios.post(this.baseUrl, JSON.stringify(params));
    }

    @computed
    get getRoleColumn() {
        return this.columns.slice();
    }
    
}

const roleManageStore = new RoleManageStore();
export default roleManageStore;