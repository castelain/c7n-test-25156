import React, { Component } from 'react';
import { Dropdown } from 'choerodon-ui/pro';
import { Menu, Button, Icon } from 'choerodon-ui';
import { inject, observer } from 'mobx-react';
import myHeaderStore from '../../role/stores/my-header-store';

@observer
class MyDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getSelectMenu = this.getSelectMenu.bind(this);
    }

     // 导航栏上选择组织的下拉菜单
    getSelectMenu = () => (
        <Menu>
            {
                myHeaderStore.getOrganizationData.map(({ id, name }) => (
                    <Menu.Item key={id}>
                        <a target="_blank" rel="noopener noreferrer" href="https://choerodon.io">{name}</a>
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    render() {
        return (
            <Dropdown overlay={ this.getSelectMenu() } placement="bottomCenter">
                <Button className="header-item">
                    请选择组织 <Icon type="arrow_drop_down" />
                </Button>
            </Dropdown>
        );
    }
}

export default MyDropdown;