import { observable, computed, action, set } from 'mobx';
import { axios } from '@choerodon/boot';

class CreateRoleStore {
    // 表单部分数据源
    // 表单预设 labels 数据源
    @observable labels = [];

    @computed
    get getLabels() {
        return this.labels.slice();
    }

    @action
    loadLabelsPromise(code){
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/labels?type=role&level=' + code;
        return axios.get(url);
    }

    // 发送请求，设置 labels 数据
    @action
    setLabels(code){
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/labels?type=role&level=' + code;
         axios.get(url)
            .then((response) => {
                this.labels = response;
                // console.log(response);
                // console.log(this.labels);
            })
            .catch((error) => {
                throw(new Error(error));
            })
    }

}

const store = new CreateRoleStore();
export default store;