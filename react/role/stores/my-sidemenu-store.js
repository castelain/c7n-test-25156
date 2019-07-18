import { observable, computed, action } from 'mobx';

class MySidemenuStore {
    // 侧边菜单数据源
    @observable menuData = [
        {
            id: 1,
            type: 'pie_chart_outlined',
            name: '组织类型',
            route: '/25156/organization-kind'
        },
        {
            id: 2,
            type: 'account_box',
            name: '角色管理',
            route: '/25156/role-manage'
        },
        {
            id: 3,
            type: 'toc',
            name: '菜单配置',
            route: '/25156/menu-settings'
        }
    ];

    // 侧边栏被选中的项目的 key
    @observable selectedKeys = [];

    @computed
    get getMenuData() {
        return this.menuData.slice();
    }

    @computed
    get getSelectedKeys() {
        return this.selectedKeys.slice();
    }

    @action
    setSelectedKeys(value) {
        this.selectedKeys = [ value ];
    }
}

const mySidemenuStore = new MySidemenuStore();
export default mySidemenuStore;