import React, { Component } from 'react';
import { Menu, Icon, Button, Modal } from 'choerodon-ui';
import { Dropdown } from 'choerodon-ui/pro';
import { Link } from 'react-router-dom';
import '../styles/my-header.less';
import { inject, observer } from 'mobx-react';
import myHeaderStore from '../role/stores/my-header-store';
import MySidebar from './components/My-Sidebar';

const { Sidebar } = Modal;

// @inject('myHeaderStore')
@observer
class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getSelectMenu = this.getSelectMenu.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    // 消息弹出框的相关方法
    showModal = () => {
        this.setState({
          messageBoxVisible: !this.state.messageBoxVisible
        });
      }
    
    handleOk = () => {
        this.setState({
            messageBoxVisible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            messageBoxVisible: false,
        });
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
                    <Link to="/25156/role-manage" className="header-item">用户设置</Link>
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
                    <Dropdown overlay={this.getSelectMenu()} placement="bottomCenter">
                        <Button className="header-item">
                            请选择组织 <Icon type="arrow_drop_down" />
                        </Button>
                    </Dropdown>
                </Menu.Item>  
            </Menu>
        );
    }

    componentDidMount() {
        this.setState({

        })
    }
}

export default MyHeader;