import React, { Component } from 'react';
import { Row, Col } from 'choerodon-ui';
import MySidemenu from '../../master/My-Sidemenu';

class OrganizationKind extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row gutter={ 16 }>
                <Col span={ 6 }>
                    <MySidemenu />
                </Col>
                <Col span={ 18 }>
                    <div>
                        <h1>组织类型</h1>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default OrganizationKind;