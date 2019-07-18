import React, { Component } from 'react';
import { Row, Col } from 'choerodon-ui';
import MySidemenu from '../master/My-Sidemenu'; 

class MenuSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row>
                <Col span={ 5 }>
                    <MySidemenu />
                </Col>
                <Col span={ 19 }>
                    <div className='box-center'>
                        <h1>菜单设置</h1>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default MenuSettings;