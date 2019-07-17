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
    }

    getContent = () => {
        return (
            <div style={{ width: "240px" }}>
                <List
                    itemLayout="horizontal"
                    split={false}
                    header={
                        <div>
                            {/* <Avatar src={ this.state.userInfo.imageUrl } />
                            <span>{ this.state.userInfo.loginName }</span>
                            <br />
                            <span>{ this.state.userInfo.email }</span> */}
                            <Avatar src="https://minio.choerodon.com.cn/iam-service/file_89927f672a40405796cc92cbd4639615_F604DA1C970E273847FF7D9FA0867D15.gif"
                                style={{ margin: "0 10px 20px 0" }}
                                size="large"
                            />
                            <div style={{ display: "inline-block", marginLeft: "20px" }}>
                                <span className="text-important">admin</span>
                                <br />
                                <span className="text-info">admin@example.org</span>
                            </div>
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
                                title={<Link to=></Link>{item.name === "接收设置" ? "平台管理" : item.name}</a>}
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
                    {/* <Avatar src={ this.state.userInfo.imageUrl } /> */}
                    <Avatar src="https://minio.choerodon.com.cn/iam-service/file_89927f672a40405796cc92cbd4639615_F604DA1C970E273847FF7D9FA0867D15.gif" />
                </Popover>
            </div>
        );
    }

    componentWillMount() {
        let promiseInfo = myHeaderStore.getUserInfo;
        let promiseOpt = myHeaderStore.getUserOpt;

        // axios.all([ promiseInfo, promiseOpt ])
        //     .then(axios.spread((userInfo, userOpt) => {
        //         this.setState({
        //             userInfo: userInfo.data,
        //             userOpt: userOpt.data.subMenus.subMenus
        //         });

        //     })
        // )
        // .catch((error) => {
        //     console.log('Error: ', error);
        // });

        promiseInfo.then((response) => {
            this.setState({
                userInfo: response
            });
        })
            .catch((error) => {
                console.log('Error: ', error);
            });

        promiseOpt.then((response) => {
            // console.log(response);
            this.setState({
                userOpt: response.subMenus[0].subMenus
            });
        })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }
}

export default MyPopover;