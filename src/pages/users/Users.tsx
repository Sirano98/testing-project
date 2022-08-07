import { Col, Row, Table } from "antd";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUsers } from "../../store/reducers/usersSlice";

export const Users: FC = () => {
    const dispatch = useAppDispatch();
    const { users, columns, pagination, isLoading } = useAppSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers(1))
    }, [dispatch])
    console.log(pagination);

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