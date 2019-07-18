import React, { Component } from 'react';
import { Row, Col } from 'choerodon-ui';
import MySidemenu from '../master/My-Sidemenu';

class PlatformManage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row>
                <Col span={ 4 }>
                    <MySidemenu />
                </Col>
                <Col span={ 20 }>
                    <div className='box-center'>
                        <h1>平台管理</h1>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default PlatformManage;