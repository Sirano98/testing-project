import Table, { ColumnsType } from "antd/lib/table";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IUser } from "../../models/IUser";
import { addUserToEdit, fetchUsers, filterUsers } from "../../store/reducers/usersSlice";

export const UsersTable: FC = () => {
    const { users, filteredUsers, isLoading, pagination } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(filterUsers())
    }, [users, dispatch])

    const columns: ColumnsType<IUser> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <Link to="/edit">{text}</Link>,
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
        <Table
            dataSource={filteredUsers}
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
    )
}