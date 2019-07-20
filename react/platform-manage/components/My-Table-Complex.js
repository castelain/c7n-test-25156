import React, { Component } from 'react';
import { Table } from 'choerodon-ui';
import { observer } from 'mobx-react';
import createRoleStore from '../../role/stores/create-role-store';

@observer
class MyTableComplex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleExpand = this.handleExpand.bind(this);
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log('createRoleStore.recordChildrenObj: ', createRoleStore.loadRecordChildren(7714));
        },
        onSelect: (record, selected, selectedRows) => {
            console.log('selected rows: ', record, selected, selectedRows);
            
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
            <Table columns={createRoleStore.getColumns}
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
                selectedRowKeys={ createRoleStore.getExpandedRowKeys }
            // expandRowByClick={true}
            // indentSize={15}
            />
        );
    }
}

export default MyTableComplex;