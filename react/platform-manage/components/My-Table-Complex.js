import React, { Component } from 'react';
import { Table } from 'choerodon-ui';
import { observer } from 'mobx-react';
import createRoleStore from '../../role/stores/create-role-store';
import MySidebar from './My-Sidebar';

@observer
class MyTableComplex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleExpand = this.handleExpand.bind(this);
    }

    // 表头数据
    columns = [
        {
            title: '菜单',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '页面入口',
            dataIndex: 'route',
            key: 'route',
            // width: '12%',
        }, {
            title: '',
            dataIndex: 'option',
            // width: '30%',
            key: 'option',
            render: (text, record) => (
                // <Button shape="circle" funcType="flat" icon="predefine" style={{ transform: 'scale(.9)' }} title='配置' />
                record.hasOwnProperty('children') ? '' : <MySidebar record={ record } />
            )
        }
    ];

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log('createRoleStore.recordChildrenObj[7714]: ', createRoleStore.loadRecordChildren(7714));
            // console.log(createRoleStore.recordChildrenObj);
        },
        onSelect: (record, selected, selectedRows) => {
            // console.log('从页面上的表格获取的选择数据: ', record, selected, selectedRows);
            createRoleStore.setTableData({ record });

        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        // getCheckboxProps: record => ({
        //     // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        //     checked: true
        // }),
        selections: true,
    };

    handleExpand = (expanded, record) => {
        // expanded -> true ：表示可展开（未展开）；为 false，则表示不可展开（已展开）
        if (!expanded) {
            createRoleStore.removeExpandedRowKey(record.key);
        } else {
            createRoleStore.addExpandedRowKey(record.key);
        }
        // console.log('Expanded: ', expanded);
    }

    render() {
        return (
            <Table columns={this.columns}
                rowSelection={this.rowSelection}
                dataSource={this.props.data}
                pagination={false}
                filterBar={false}
                defaultExpandAllRows={createRoleStore.isAllOpened}
                // fixed={false}
                // empty={ <h3>暂时没有数据哦...</h3> }
                // hideDefaultSelections={false}
                // expandedRowKeys={['0', '2',]}
                expandedRowKeys={createRoleStore.getExpandedRowKeys}
                onExpand={this.handleExpand}
            // selectedRowKeys={ [7714] }
            // expandRowByClick={true}
            // indentSize={15}
            />
        );
    }
}

export default MyTableComplex;