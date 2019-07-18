import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'choerodon-ui/pro';
import { Menu, Button, Icon } from 'choerodon-ui';
import { observer } from 'mobx-react';
import myHeaderStore from '../../role/stores/my-header-store';

@observer
class MyDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getSelectMenu = this.getSelectMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = ({ item, key, keyPath }) => {
        myHeaderStore.setSelectedText(key);
    }

     // 导航栏上选择组织的下拉菜单
    getSelectMenu = () => (
        <Menu onClick={ this.handleClick }>
            {
                myHeaderStore.getOrganizationData.map(({ id, name, route }) => (
                    <Menu.Item key={ id }>
                        <Link to={ route }>{ name }</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    render() {
        return (
            <Dropdown overlay={ this.getSelectMenu() } placement="bottomCenter">
                <Button className="header-item">
                    { myHeaderStore.selectedText } <Icon type="arrow_drop_down" />
                </Button>
            </Dropdown>
        );
    }
}

export default MyDropdown;