import React, { Component } from 'react';
import { Tabs, Button } from 'choerodon-ui';
import { observer } from 'mobx-react';
import createRoleStore from '../../role/stores/create-role-store';
import roleManageStore from '../../role/stores/role-manage-store';
import MyTableComplex from '../components/My-Table-Complex';
const TabPane = Tabs.TabPane;

function callback(key) {
    // console.log(key);
}

@observer
class MyTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openBtnData: [
                {
                    type: 'expand_more',
                    name: '全部展开'
                },
                {
                    type: 'expand_less',
                    name: '全部收起'
                }
            ]
        }
        this.toggleOpen = this.toggleOpen.bind(this);
        this.getTabs = this.getTabs.bind(this);
    }

    toggleOpen() {
        if (createRoleStore.getIsAllOpened) {
            createRoleStore.clearExpandedRowKey();
        } else {
            createRoleStore.setExpandedRowKey(createRoleStore.getFullExpandedRowKeys);
        }
        createRoleStore.toggleIsAllOpened();
    }

    getTabs() {
        if (roleManageStore.levelBtnObj.code === 'site') {
            return (
                <Tabs defaultActiveKey="site" onChange={callback}>
                    <TabPane tab="全局层" key="site">
                        <MyTableComplex data={createRoleStore.getSiteMenusData} />
                    </TabPane>
                    <TabPane tab="个人中心" key="user">
                        <MyTableComplex data={createRoleStore.getUserMenusData} />
                    </TabPane>
                </Tabs>
            );
        } else if (roleManageStore.levelBtnObj.code === 'project') {
            return (
                <Tabs defaultActiveKey="project" onChange={callback}>
                    <TabPane tab="项目层" key="project">
                        <MyTableComplex data={createRoleStore.getProjectMenusData} />
                    </TabPane>
                </Tabs>
            );
        } else if(roleManageStore.levelBtnObj.code === 'organization') {
            return (
                <Tabs defaultActiveKey="organization" onChange={callback}>
                    <TabPane tab="组织层" key="organization">
                        <MyTableComplex data={createRoleStore.getOrganizationMenusData} />
                    </TabPane>
                </Tabs>
            );
        }
    }

    render() {
        // 获取展开与收起的按钮
        const getBtn = () => {
            let isAllOpened = createRoleStore.getIsAllOpened;
            if (isAllOpened) {
                return (<Button type="primary" funcType="flat" icon={this.state.openBtnData[1].type} onClick={this.toggleOpen}>{this.state.openBtnData[1].name}</Button>);
            } else {
                return (<Button type="primary" funcType="flat" icon={this.state.openBtnData[0].type} onClick={this.toggleOpen}>{this.state.openBtnData[0].name}</Button>);
            }
        };

        return (
            <div style={{ paddingRight: '.5rem', marginBottom: '.5rem' }}>
                <div>
                    <h3>菜单分配</h3>
                    {
                        getBtn()
                    }

                </div>
                {
                    this.getTabs()
                }
            </div>
        );
    }

    componentDidMount() {
        createRoleStore.setMenusData('site');
        createRoleStore.setMenusData('user');
        createRoleStore.setMenusData('project');
        createRoleStore.setMenusData('organization');
        // console.log('userMenusData: ', createRoleStore.userMenusData)
        // console.log('organizationMenusData: ', createRoleStore.organizationMenusData);
    }
}

export default MyTabs;