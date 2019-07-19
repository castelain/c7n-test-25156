import { observable, computed, action } from 'mobx';
import { axios } from '@choerodon/boot';
import { StringDecoder } from 'string_decoder';
import { observer } from 'mobx-react';
import roleManageStore from '../stores/role-manage-store';

@observer
class CreateRoleStore {
    // 表单部分数据源
    // 表单预设 labels 数据源
    @observable labels = [];

    @computed
    get getLabels() {
        console.log('this.labels:', this.labels);
        if(!this.labels){
            this.setLabels();
        }
        console.log(this.labels);
        return this.labels.slice();
    }

    // 发送请求，设置 labels 数据
    @action
    setLabels(params){
        params = params || roleManageStore.levelBtnObj.code;
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/labels?type=role&level='+ params;
        console.log(url);
        axios.get(url)
             .then((response) => {
                this.labels = response.slice();
                console.log(this.labels);
             })
             .catch((error) => {
                throw (new Error('Error:', error));
             });
    }
}

const store = new CreateRoleStore();
export default store;