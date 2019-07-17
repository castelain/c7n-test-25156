import { observable, computed, action } from 'mobx';

class MyHeaderStore {
    // 组织选择的数据源
    @observable organizationData = [
        {
            id: 1,
            name: '上海汉得信息技术股份有限公司'
        },
        {
            id: 2,
            name: '猪齿鱼'
        },
        {
            id: 3,
            name: '敏捷测试专用'
        },
        {
            id: 4,
            name: '产品运营'
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
    
    @computed
    get getOrganizationData() {
        return this.organizationData.slice();
    }

    @computed
    get getMessages() {
        return this.messages.slice();
    }

    @action
    setVisible(value) {
        this.visible = value;
    }

}

const store = new MyHeaderStore();
export default store;