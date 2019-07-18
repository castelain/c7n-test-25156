import { observable, computed, action } from 'mobx';
import { axios } from '@choerodon/boot';

class MyHeaderStore {
    // 组织选择按钮的显示文本
    @observable selectedText = '请选择组织';

    // 组织选择的数据源
    @observable organizationData = [
        {
            id: 0,
            name: '上海汉得信息技术股份有限公司',
            route: '/25156/hand-china'
        },
        {
            id: 1,
            name: '猪齿鱼',
            route: '/25156/choerodon'
        },
        {
            id: 2,
            name: '敏捷测试专用',
            route: '/25156/agile-testing'
        },
        {
            id: 3,
            name: '产品运营',
            route: '/25156/product-operation'
        }
    ];

    // 控制侧边弹出框的显示与否
    @observable visible = false;

    // 侧边弹出框中的消息数据源
    @observable messages = [
        {
            id: 1,
            content: '这是消息1！'
        },
        {
            id: 2,
            content: '这是消息2！'
        },
        {
            id: 3,
            content: '这是消息3！'
        }
    ]

    // 获取用户信息的 Api 地址
    @observable userInfoUrl = 'http://api.staging.saas.hand-china.com/iam/v1/users/self';

    // 获取用户操作列表的 Api 地址
    @observable userOptUrl = 'http://api.staging.saas.hand-china.com/iam/v1/menus?code=choerodon.code.top.user&source_id=0';

    @computed
    get getOrganizationData() {
        return this.organizationData.slice();
    }

    @computed
    get getMessages() {
        return this.messages.slice();
    }

    // 返回获取用户信息的 Promise 对象
    @computed
    get getUserInfo() {
        return axios.get(this.userInfoUrl);
    }

    // 返回获取用户操作列表的 Promise 对象
    @computed
    get getUserOpt() {
        return axios.get(this.userOptUrl);
    }

    // 设置侧边栏的显示与否
    @action
    setVisible(value) {
        this.visible = value;
    }

    // 选择后，改变下拉框按钮的文字
    @action
    setSelectedText(key) {
        this.selectedText = this.getOrganizationData[key].name;
    }

    // 切换到其他层级时，重置下拉框按钮的文字
    @action
    resetSelectedText() {
        this.selectedText = '请选择组织';
    }
}

const store = new MyHeaderStore();
export default store;