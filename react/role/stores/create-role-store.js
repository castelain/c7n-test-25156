import React, { Component } from 'react';
import { observable, computed, action, set } from 'mobx';
import { Icon, Button } from 'choerodon-ui';
import { axios } from '@choerodon/boot';

class CreateRoleStore {
    // 控制侧边栏的显示与否
    @observable visible = false;

    // 表单部分数据源
    // 表单预设 labels 数据源
    @observable labels = [];

    // 标识菜单项是否全部展开
    @observable isAllOpened = true;
    // 控制菜单项展开与否的数组
    @observable expandedRowKeys = [];
    @observable fullExpandedRowKeys = [];
    // 数据项的 children 映射数组 （Object(Array))）
    @observable recordChildrenObj = {};

    // 表格选择的数据
    @observable tableData = {};
    // 表单提交的数据
    @observable formData = {};

    // 用户菜单数据
    @observable userMenusData = [];

    // 全局菜单数据
    @observable siteMenusData = [];

    @observable projecMenustData = [];

    @observable organizationMenusData = [];

    // 表单数据
    @observable formData = {};

    @computed
    get getLabels() {
        return this.labels.slice();
    }

    @computed
    get getIsAllOpened() {
        return this.isAllOpened;
    }

    @action
    toggleIsAllOpened() {
        this.isAllOpened = !this.isAllOpened;
    }

    @action
    loadLabelsPromise(code) {
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/labels?type=role&level=' + code;
        return axios.get(url);
    }

    // 发送请求，设置 labels 数据
    @action
    setLabels(code) {
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/labels?type=role&level=' + code;
        axios.get(url)
            .then((response) => {
                this.labels = response;
                // console.log(response);
                // console.log(this.labels);
            })
            .catch((error) => {
                throw (new Error(error));
            })
    }

    @computed
    get getSiteMenusData() {
        return this.siteMenusData.slice();
    }

    @computed
    get getUserMenusData() {
        return this.userMenusData.slice();
    }

    @computed
    get getProjectMenusData() {
        return this.projecMenustData.slice();
    }

    @computed
    get getOrganizationMenusData() {
        return this.organizationMenusData.slice();
    }

    @computed
    get getExpandedRowKeys() {
        return this.expandedRowKeys.slice();
    }

    @computed
    get getFullExpandedRowKeys() {
        return this.fullExpandedRowKeys.slice();
    }

    @action
    addExpandedRowKey(value) {
        this.expandedRowKeys.push(value);
    }

    @action
    removeExpandedRowKey(value) {
        let index = this.expandedRowKeys.indexOf(value);
        if (index === -1) {
            return;
        } else {
            this.expandedRowKeys.splice(index, 1);
        }
    }

    @action
    setExpandedRowKey(value) {
        this.expandedRowKeys = value;
    }

    @action
    clearExpandedRowKey() {
        this.expandedRowKeys = [];
    }

    @action
    setFormData(value) {
        this.formData = value;
    }

    @action
    loadRecordChildren(key) {
        // console.log('key: ', key);
        // console.log( this.recordChildrenObj[key]);
        // console.log('this.recordChildrenObj: ', this.recordChildrenObj);
        if (this.recordChildrenObj.hasOwnProperty(key)) {
            return this.recordChildrenObj[key].slice();
        } else {
            return [];
        }
    }

    @action
    addRecordChildrenObj(key, recordChildren) {
        this.recordChildrenObj[key] = recordChildren;
    }

    @action
    setFormData(value) {
        this.formData = value;
    }

    @action
    setTableData(value) {
        this.tableData = value;
    }

    // 发送请求，设置 menus 表格数据
    @action
    setMenusData(type) {
        let url = 'http://api.staging.saas.hand-china.com/iam/v1/menus/menu_config?code=choerodon.code.top.' + type;
        axios.get(url)
            .then((response) => {
                for (let i = 0; i < response.subMenus.length; i++) {
                    let data = response.subMenus[i];
                    let recordChildren = [];
                    data.children = data.subMenus;
                    data.key = data.id;
                    this.addExpandedRowKey(data.key);
                    data.name = <span><Icon type={data.icon} style={{ marginRight: '.1rem' }} />{data.name}</span>;
                    if(data.children){
                        for (let j = 0; j < data.children.length; j++) {
                            let item = data.children[j];
                            item.key = item.id;
                            this.addExpandedRowKey(item.key);
                            item.name = <span><Icon type={item.icon} style={{ marginRight: '.1rem' }} />{item.name}</span>;
                            recordChildren.push(data.children[j]);
                        }
                    }
                    this.addRecordChildrenObj(data.key, recordChildren);
                    // console.log('this.recordChildrenObj: ', this.recordChildrenObj);
                }
                this.fullExpandedRowKeys = this.expandedRowKeys;
                if (type === 'site') {
                    this.siteMenusData = response.subMenus;
                } else if (type === 'user') {
                    this.userMenusData = response.subMenus;
                } else if(type === 'project') {
                    this.projecMenustData = response.subMenus;
                }else if(type === 'organization') {
                    // console.log('response: ', response);
                    this.organizationMenusData = response.subMenus;
                }
                // this.organizationMenusData = response.subMenus;
                // console.log('response: ', response);
                // console.log('---', this.organizationMenusData, '---');
            })
            .catch((error) => {
                // throw (new Error('Error: ', error));
                console.log(error);
            });
    }

    // 设置侧边栏的显示与否
    @action
    setVisible(value) {
        this.visible = value;
    }
}

const store = new CreateRoleStore();
export default store;