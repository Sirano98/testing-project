import { Col, Row } from "antd";
import { FC, useEffect } from "react";
import { FilterInput } from "../../components/filterInput/FilterInput";
import { Layout } from "../../components/layout/Layout";
import { UsersTable } from "../../components/usersTable/UsersTable";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUsers } from "../../store/reducers/usersSlice";


export const Users: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers(1))
    }, [dispatch])

    return (
        <Layout>
            <>
                <FilterInput />
                <UsersTable />
            </>
        </Layout>

    )
}