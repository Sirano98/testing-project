import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IUser } from "../../models/IUser";
import { addUserToEdit, fetchUsers } from "../../store/reducers/usersSlice";


export const Users: FC = () => {
    const dispatch = useAppDispatch();
    const { users, pagination, isLoading } = useAppSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers(1))
    }, [dispatch])

    const columns: ColumnsType<IUser> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <Link to="/edit">{text}</Link>,
            onCell: (user) => {
                return {
                    onClick: () => {
                        dispatch(addUserToEdit(user))
                    }
                };
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        }
    ]

    return (
        <>
            <Row>
                <Col span={12} offset={6}>
                    <Table
                        dataSource={users}
                        columns={columns}
                        loading={isLoading}
                        pagination={{
                            total: pagination?.total,
                            showSizeChanger: false,
                            current: pagination?.page,
                            onChange: (page) => {
                                dispatch(fetchUsers(page))
                            }
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}