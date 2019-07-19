import React, { Component } from 'react';
import { Table, Icon, Input, Button } from 'choerodon-ui';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';

@observer
class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            roleData: [],
            pagination: {},
            // 筛选数据的设置数据
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
             // 表头列名数据
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    filterDropdown: (
                        <div className="custom-filter-dropdown">
                            <Input
                                ref={ele => this.state.searchInput = ele}
                                placeholder="Search name"
                                value={this.searchText}
                                onChange={this.onInputChange}
                                onPressEnter={this.onSearch}
                            />
                            <Button type="primary" onClick={this.onSearch}>Search</Button>
                        </div>
                    ),
                    filterIcon: <Icon type="smile-o" style={{ color: this.filtered ? '#108ee9' : '#aaa' }} />,
                    filterDropdownVisible: this.filterDropdownVisible,
                    onFilterDropdownVisibleChange: (visible) => {
                        this.setState({
                            filterDropdownVisible: visible,
                        }, () => this.searchInput && this.searchInput.focus());
                    },
                    filters: [],
                    onFilter: (value, record) => record.name.indexOf(value) !== -1,
                },
                {
                    title: '编码',
                    dataIndex: 'code',
                    key: 'code',
                    filters: [],
                    onFilter: (value, record) => record.code.indexOf(value) !== -1,
                },
                {
                    title: '层级',
                    dataIndex: 'level',
                    key: 'level',
                    filters: [{
                        text: '全局',
                        value: '全局',
                    }, {
                        text: '组织',
                        value: '组织',
                    }, {
                        text: '项目',
                        value: '项目'
                    }],
                    onFilter: (value, record) => record.level === value,
                },
                {
                    title: '来源',
                    dataIndex: 'buildIn',
                    key: 'buildIn',
                    filters: [{
                        text: '自定义',
                        value: 'div',
                    }, {
                        text: '预定义',
                        value: 'p',
                    }],
                    onFilter: (value, record) => record.buildIn.type === value,
                },
                {
                    title: '状态',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    filters: [{
                        text: '启用',
                        value: 'p',
                    }, {
                        text: '停用',
                        value: 'div'
                    }],
                    onFilter: (value, record) => record.enabled.type == value,
                },
                {
                    title: '',
                    key: 'operations',
                    render: (text, record) => (
                        <Button shape="circle" funcType="flat" icon="more_vert" />
                    ),
                }
            ],
        };
        this.handleTableChange = this.handleTableChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        let params = {
            size: pagination.pageSize,
            page: pagination.current,
            level: 'site',
            params: []
        };
        roleManageStore.setRoleData(params);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    // 筛选表格数据
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
                            {record.name.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { loading, data, pagination } = roleManageStore.getRoleData;
        // console.log('data: ', data);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Table rowSelection={rowSelection}
                    // columns={roleManageStore.getRoleColumn}
                    columns={ this.state.columns }
                    dataSource={ data }
                    pagination={pagination }
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }

    componentDidMount() {
        roleManageStore.setRoleData({ "params": [], "page": 1, "size": 10 });
    }
}

export default MyTable;