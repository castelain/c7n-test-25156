import React, { Component } from 'react';
import { Form, Input, Button, Select, Spin } from 'choerodon-ui';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';
import createRoleStore from '../../role/stores/create-role-store';
import { Link, withRouter } from 'react-router-dom';
import '../../styles/my-form.less';
import MyTabs from './My-Tabs';
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@observer
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 校验成功，提交表单数据前，对数据进行处理
                // 去除角色名称左边的所有空格
                values.name = values.name.trimLeft();
                // 去除角色名称左边的首位空格
                // values.name = values.name.replace(/^\s/g,'');
                values.labels = values.labels.map((item) => (
                    { id: item }
                ));
                values.level = roleManageStore.levelBtnObj.code;
                values.code = `role/${values.level}/custom/${ values.code}`;
                // 提交数据到 store 中
                createRoleStore.setFormData(values);
                console.log('=====================================');
                console.log('从页面上的表单获取的数据： ', createRoleStore.formData);
                console.log('从页面上的表格获取的数据：', createRoleStore.tableData);
                console.log('=====================================');
                this.props.history.push('/25156/role-manage');
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const codeError = isFieldTouched('code') && getFieldError('code');
        const nameError = isFieldTouched('name') && getFieldError('name');
        const labelsError = isFieldTouched('labels') && getFieldError('labels');

        let getOptions = (data) => {
            console.log('data: ', data);
            return (
                <FormItem
                    validateStatus={labelsError ? 'error' : ''}
                    help={labelsError || ''}
                    label="labels"
                    style={{ margin: '.3rem 0' }}
                >
                    {
                        getFieldDecorator('labels', {
                            rules: [
                                { required: false, message: '角色标签', type: 'array' },
                            ],
                        })(
                            <Select mode="multiple" placeholder="请选择角色标签" style={{ width: '4.45rem' }}>
                                {
                                    data.map(({ id, name }) => (
                                        <Option value={id} key={id}>{name}</Option>
                                    ))
                                }
                            </Select>,
                        )
                    }
                </FormItem>);
        }

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={codeError ? 'error' : ''}
                    help={codeError || ''}
                    label='code'
                >
                    {
                        getFieldDecorator('code', {
                            rules: [
                                { required: true, message: '请输入角色编码' },
                                { pattern: /^[a-zA-Z][a-zA-Z0-9_\-/]*$/ig, message: '编码必须以字母开头，只能输入字母，数字，_，-，/' }
                            ],
                        })(
                            <Input prefix={`role/${roleManageStore.levelBtnObj.code}/custom/`} placeholder="角色编码" />
                        )
                    }
                </FormItem>
                <FormItem
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                    label='name'
                >
                    {
                        getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入角色名称' },
                            ],
                        })(
                            <Input placeholder="角色名称" />
                        )
                    }
                </FormItem>
                <br />

                {
                    createRoleStore.getLabels ? getOptions(createRoleStore.getLabels) : <Spin />
                }

                <MyTabs />

                <FormItem className='btn-group'>
                    <Button funcType="raised"
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}>
                        创建
                    </Button>
                    <Button funcType="raised">
                        <Link to='/25156/role-manage' style={{ marginRight: '.05rem' }}>
                            取消
                        </Link>
                    </Button>
                </FormItem>
            </Form>
        );
    }
    componentDidMount() {
        createRoleStore.setLabels(roleManageStore.levelBtnObj.code);
        this.props.form.validateFields();
    }
}

const WrappedMyFormMyForm = Form.create()(MyForm);
export default withRouter(WrappedMyFormMyForm);

