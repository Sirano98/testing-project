import { Button, Col, Form, Input, Row, Select } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IUser } from "../../models/IUser";
import { editUser } from "../../store/reducers/usersSlice";

export const Edit: FC = () => {
    const dispatch = useAppDispatch();
    const userToEdit = useAppSelector(state => state.users.userToEdit);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [name, setName] = useState(userToEdit?.name);
    const [email, setEmail] = useState(userToEdit?.email);
    const [gender, setGender] = useState(userToEdit?.gender);
    const [status, setStatus] = useState(userToEdit?.status);

    const onFinish = (values: IUser) => {
        const user = { ...values, id: (userToEdit ? userToEdit.id : 0) }

        dispatch(editUser(user));
        navigate('/', { replace: true });
    };

    const discardChages = () => {
        setName(userToEdit?.name)
        setEmail(userToEdit?.email)
        setGender(userToEdit?.gender)
        setStatus(userToEdit?.status)

        form.setFieldsValue({
            name: userToEdit?.name,
            email: userToEdit?.email,
            gender: userToEdit?.gender,
            status: userToEdit?.status
        });

    }

    return (
        <Row>
            <Col span={12} offset={6}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete='off'
                    onFinish={onFinish}
                    form={form}>

                    <Form.Item
                        name='name'
                        label='Name'
                        initialValue={name}
                        rules={[
                            { whitespace: true },
                            { min: 3 }
                        ]}>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item name='email' label='Email' initialValue={email}>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item name='gender' label='Gender' initialValue={gender}>
                        <Select value={gender} onChange={(e) => setGender(e)}>
                            <Select.Option value='male'>Male</Select.Option>
                            <Select.Option value='female'>Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='status' label='Status' initialValue={status}>
                        <Select value={status} onChange={(e) => setStatus(e)}>
                            <Select.Option value='active'>Active</Select.Option>
                            <Select.Option value='inactive'>Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" onClick={discardChages} >Discard</Button>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" onClick={() => navigate('/')} >Back</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}