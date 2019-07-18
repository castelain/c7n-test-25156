import React, { Component } from 'react';
import { Divider, Menu, Icon, Button } from 'choerodon-ui';
import { Dropdown } from 'choerodon-ui/pro';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';
import '../../styles/sub-header.less';

@observer
class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getMenu = this.getMenu.bind(this);
    }

    getMenu() {
        return (
            <Menu style={{ width: '1rem' }}>
                <Menu.Item key="0">
                    <a href="https://choerodon.io/">全局</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="https://choerodon.io/">组织</a>
                </Menu.Item>
                <Menu.Item key="3">项目</Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <div className='box-content'>
                <div>
                    <h2>{ roleManageStore.partName }</h2>
                    <Dropdown overlay={ this.getMenu() } trigger={['click']}>
                        <a className="c7n-dropdown-link" href="#">
                            全局 <Icon type="arrow_drop_down" />
                        </a>
                    </Dropdown>
                    <Button type="primary" funcType="flat" icon="playlist_add">创建角色</Button>
                    <Button type="primary" funcType="flat" icon="content_copy">基于所选角色创建</Button>
                    <Button type="primary" funcType="flat" icon="refresh">刷新</Button>
                </div>
                <Divider className='divider' />
                <div>
                    <h2>{ roleManageStore.title }</h2>
                    <p>{ roleManageStore.description }</p>
                </div>
                {/* <Divider className='divider' /> */}
            </div>
        );
    }
}

export default SubHeader;
