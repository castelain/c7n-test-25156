import React, { Component } from 'react';
import { Menu, Icon } from 'choerodon-ui';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import mySidemenuStore from '../role/stores/my-sidemenu-store';
import '../styles/my-sidemenu.less';

@observer
class MySidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = ({ item, key, keyPath }) => {
        mySidemenuStore.setSelectedKeys(key);
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div style={{ width: 234 }}>
                <Menu
                    defaultSelectedKeys={ mySidemenuStore.getSelectedKeys }
                    mode='inline'
                    inlineCollapsed={this.state.collapsed}
                    onClick={ this.handleClick }
                    id='sidemenu'
                >
                    <Menu.Item key='0'>
                        <Icon type={this.state.collapsed ? 'folder_open' : 'folder'} onClick={this.toggleCollapsed} />
                        <span>控制菜单收缩</span>
                    </Menu.Item>
                    <Menu.Item style={{ display: `${this.state.collapsed ? 'none' : ''}` }}>
                        {/* <Icon type="domain_list" /> */}
                        <span className='text-important'>平台管理</span>
                    </Menu.Item>
                    {
                        mySidemenuStore.getMenuData.map(({ id, type, name, route }) => (
                            <Menu.Item key={ id }>
                                <Link to={ route }>
                                    <Icon type={ type } />
                                    <span>
                                        { name }
                                    </span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        );
    }
}

export default MySidemenu;