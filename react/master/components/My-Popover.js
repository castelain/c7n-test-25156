import React, { Component } from 'react';
import { Popover, Avatar, List, Icon } from 'choerodon-ui';
import { observer } from 'mobx-react';
import myHeaderStore from '../../role/stores/my-header-store';
import { Link } from 'react-router-dom';
import { axios } from '@choerodon/boot';

@observer
class MyPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            userOpt: [],
        }
        this.getContent = this.getContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        myHeaderStore.resetSelectedText();
    }

    getContent = () => {
        return (
            <div style={{ width: "240px" }}>
                <List
                    itemLayout="horizontal"
                    split={false}
                    onClick={ this.handleClick }
                    header={
                        <div>
                            <Avatar src={ this.state.userInfo.imageUrl } 
                                style={{ margin: "0 10px 20px 0" }}
                                size="large"
                            />
                            <div style={{ display: "inline-block", marginLeft: "20px" }}>
                                <span className="text-important">{ this.state.userInfo.loginName }</span>
                                <br />
                                <span className="text-info">{ this.state.userInfo.email }</span>
                            </div>
                            <br />
                        </div>}
                    footer={
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Icon type="arrow_forward" />}
                                title={<Link to="/25156/logout">退出登录</Link>}
                            />
                        </List.Item>}
                    dataSource={this.state.userOpt}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Icon type={item.icon} />}
                                title={<Link to={ `/25156${ item.route }` }>{item.name === "接收设置" ? "平台管理" : item.name}</Link>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Popover content={this.getContent()} arrowPointAtCenter trigger="click" placement="bottomRight">
                    <Avatar src={ this.state.userInfo.imageUrl } />
                </Popover>
            </div>
        );
    }

    componentWillMount() {
        let promiseInfo = myHeaderStore.getUserInfo;
        let promiseOpt = myHeaderStore.getUserOpt;

        axios.all([ promiseInfo, promiseOpt ])
            .then(axios.spread((userInfo, userOpt) => {
                this.setState({
                    userInfo: userInfo,
                    userOpt: userOpt.subMenus[0].subMenus
                });

            })
        )
        .catch((error) => {
            console.log('Error: ', error);
        });
    }
}

export default MyPopover;