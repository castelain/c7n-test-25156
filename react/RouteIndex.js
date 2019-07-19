import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';
import { asyncRouter, nomatch } from '@choerodon/boot';
import AligeTesting from './agile-testing/index';
import Choerodon from './choerodon/index';
import HandChina from './hand-china/index';
import ProductOperation from './product-operation/index';
import PlatformManage from './platform-manage/index';
import RoleManege from './platform-manage/Role-Manage';
import MenuSettings from './platform-manage/Menu-Settings';
import OrganizationKind from './platform-manage/Organization-Kind';
import CreateRole from './platform-manage/Create-Role';

// const RoleManage = asyncRouter(() => import('./role-manage/index'));

@inject('AppState')
class RouteIndex extends React.Component {
    render() {
        const { match, AppState } = this.props;

        // console.log("Match", match);

        return (
            <Switch>
                {/* 导航栏下拉菜单路由 */}
                <Route path={ `${ match.url }/agile-testing` } component={ AligeTesting } exact />
				<Route path={ `${ match.url }/choerodon` } component={ Choerodon } />
				<Route path={ `${ match.url }/hand-china` } component={ HandChina }  />
				<Route path={ `${ match.url }/product-operation` } component={ ProductOperation }  />
                {/* 用户设置中的平台设置路由 */}
                <Route path={ `${ match.url }/notify/receive-setting` } component={ PlatformManage } />
                <Route  path={ `${ match.url }/organization-kind` } component={ OrganizationKind } />
                <Route  path={ `${ match.url }/role-manage` } component={ RoleManege } />
                <Route  path={ `${ match.url }/menu-settings` } component={ MenuSettings } />
                {/* 角色管理中的路由 */}
                <Route path={ `${ match.url }/create` } component={ CreateRole } />
                <Route path="*" component={ nomatch } />
            </Switch>
        );
    }
}

export default RouteIndex;