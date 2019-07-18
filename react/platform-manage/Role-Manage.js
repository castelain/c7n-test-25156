import React, { Component } from 'react';
import { Row, Col, Divider } from 'choerodon-ui';
import MySidemenu from '../master/My-Sidemenu';
import SubHeader from './components/Sub-Header';
import MyTable from './components/My-Table';

class RoleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row>
                <Col span={ 5 }>
                    <div style={{ position: 'fixed' }}>
                        <MySidemenu />
                    </div>
                </Col>
                <Col span={ 19 }>
                    <SubHeader />
                    <div style={{ paddingRight: '.5rem', marginBottom: '.5rem' }}>
                        <MyTable />
                    </div>
                </Col>
            </Row>
        );
    }
}

export default RoleManage;