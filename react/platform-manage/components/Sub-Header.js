import React, { Component } from 'react';
import { Menu, Icon, Button } from 'choerodon-ui';
import { Dropdown } from 'choerodon-ui/pro';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import roleManageStore from '../../role/stores/role-manage-store';
import '../../styles/sub-header.less';

@observer
class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getMenu = this.getMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (({ item, key, keyPath }) => {
        roleManageStore.setLevelBtnObj(key);
        let params = { "params": [], "page": 1, "size": 10 };
        roleManageStore.setRoleData(params);

    })

    getMenu() {
        return (
            <Menu style={{ width: '1rem' }} onClick={this.handleClick}>
                {
                    roleManageStore.getLevelData.map(({ id, name }) => (
                        <Menu.Item key={id}>
                            {name}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }

    render() {
        return (
            <div className='box-content'>
                <div id='sub-header'>
                    <h2>{roleManageStore.partName}</h2>
                    <Dropdown overlay={this.getMenu()} trigger={['click']}>
                        <a className="c7n-dropdown-link" href="#">
                            {roleManageStore.levelBtnObj.name} <Icon type="arrow_drop_down" />
                        </a>
                    </Dropdown>
                    
                    <Link to='/25156/create'>
                        <Button type="primary" funcType="flat" icon="playlist_add">
                            创建角色
                        </Button>
                    </Link>
                    
                    <Button type="primary" funcType="flat" icon="content_copy">基于所选角色创建</Button>
                    <Button type="primary" funcType="flat" icon="refresh">刷新</Button>
                </div>
                <div id='sub-header-info'>
                    <h2>{roleManageStore.title}</h2>
                    <p>{roleManageStore.description}</p>
                </div>
            </div>
        );
    }
}

export default SubHeader;
