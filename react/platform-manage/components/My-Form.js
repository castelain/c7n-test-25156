import React, { Component } from 'react';
import { Form, Input, Button, Select, Spin } from 'choerodon-ui';
import { observer } from 'mobx-react';
import roleManageStore from '../../role/stores/role-manage-store';
import createRoleStore from '../../role/stores/create-role-store';
import { Link } from 'react-router-dom';
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
                console.log('Received values of form: ', values);
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
                    label="Select[multiple]"
                    style={{ margin: '.3rem 0' }}
                >
                    {getFieldDecorator('select-multiple', {
                        rules: [
                            { required: true, message: '角色标签', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple" placeholder="请选择角色标签" style={{ width: '4.45rem' }}>
                            {
                                data.map(({ id, name }) => (
                                    <Option value={name} key={id}>{name}</Option>
                                ))
                            }
                        </Select>,
                    )}
                </FormItem>);
        }

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={codeError ? 'error' : ''}
                    help={codeError || ''}
                >
                    {getFieldDecorator('code', {
                        rules: [
                            { required: true, message: '请输入角色编码' },
                            { pattern: /^[a-zA-Z][a-zA-Z0-9_\-/]*$/ig, message: '编码必须以字母开头，只能输入字母，数字，_，-，/' }
                        ],
                    })(
                        <Input prefix={`role/${roleManageStore.levelBtnObj.code}/custom/`} placeholder="角色编码" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入角色名称' },
                        ],
                    })(
                        <Input placeholder="角色名称" />
                    )}
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
export default WrappedMyFormMyForm;

