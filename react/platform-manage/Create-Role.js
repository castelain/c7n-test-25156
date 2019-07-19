import React, { Component } from 'react';
import { Row, Col, Button } from 'choerodon-ui';
import { Link } from 'react-router-dom';
import {  observer } from 'mobx-react';
import MySidemenu from '../master/My-Sidemenu';
import '../styles/sub-header.css';

class CreateRole extends Component {
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
                    <div className='box-content'>
                        <div id='sub-header'>
                            <Link to='/25156/role-manage' style={{ marginRight: '.05rem' }}>
                                <Button type="primary" funcType="flat" shape="circle" icon="arrow_back" size='large' />
                            </Link>
                            <h2>创建角色</h2>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default CreateRole;