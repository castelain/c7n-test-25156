import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';

const RoleManage = asyncRouter(() => import('./role-manage/index'));

@inject('AppState')
class RouteIndex extends React.Component {
    render() {
        const { match, AppState } = this.props;

        return (
            <Switch>
                <Route path={ `${match.url}/role-manage` } component={ RoleManage } exact />
                {/* <Route path={`${match.url}/demo`} component={DemoIndex} /> */}
                <Route path="*" component={ nomatch } />
            </Switch>
        );
    }
}

export default RouteIndex;