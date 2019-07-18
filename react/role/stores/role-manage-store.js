import { observable, computed, action } from 'mobx';

class RoleManageStore {
    @observable partName = '角色管理';

    @observable title = '平台"Choerodon"的角色管理';

    @observable description = '角色是您可分配给成员的一组权限。您可以创建角色并为其添加权限，也可以复制现有角色并调整其权限。';


}

const roleManageStore = new RoleManageStore();
export default roleManageStore;