import React, { Component } from 'react';
import { Menu, Icon } from 'choerodon-ui';
import { Link } from 'react-router-dom';
import '../styles/my-header.less';
import MySidebar from './components/My-Sidebar';
import MyPopover from './components/My-Popover';
import MyDropdown from './components/My-Dropdown';

class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Menu
                selectedKeys={ [this.state.current] }
                mode="horizontal"
                id="header-box"
            >
                <Menu.Item key="homepage">
                    <Link to="/" className="header-item" id="header-logo">
                        <Icon type="home" /><b>Choerodon</b>
                    </Link>
                </Menu.Item>
                <Menu.Item key="collaborative-connection">
                    <Link to="/25156/collaborative-connection" className="header-item">
                        <Icon type="people_outline" />协作连接
                    </Link>
                </Menu.Item>
                <Menu.Item key="project">
                    <Link to="/25156/project" className="header-item">
                        <Icon type="microservice" />项目
                    </Link>
                </Menu.Item>
                <Menu.Item key="application-market">
                    <Link to="/25156/application-market" className="header-item">
                        <Icon type="appmarket" />应用市场
                    </Link>
                </Menu.Item>
                <Menu.Item key="knowledge">
                    <Link to="/25156/knowledge" className="header-item">
                        <Icon type="book" />知识
                    </Link>
                </Menu.Item>
                <Menu.Item key="role-manage" className="right">
                    <MyPopover />
                </Menu.Item>
                <Menu.Item key="message" className="right">
                    <MySidebar className="header-item" />
                </Menu.Item>
                <Menu.Item key="help" className="right">
                    <Link to="/25156/help" className="header-item">
                        <Icon type="help" />
                    </Link>
                </Menu.Item>
                <Menu.Item key="manage-center" className="right">
                    <Link to="/25156/manage-center" className="header-item">
                        <Icon type="predefine" />管理中心
                    </Link>
                </Menu.Item>
                <Menu.Item key="select-organization" className="right">
                    <MyDropdown />
                </Menu.Item>  
            </Menu>
        );
    }
}

export default MyHeader;