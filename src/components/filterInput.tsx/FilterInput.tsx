import { Form, Select } from "antd";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { filterUsers, setFilterValur } from "../../store/reducers/usersSlice";

export const FilterInput: FC = () => {
    const gender = useAppSelector(state => state.users.filterValue);
    const dispatch = useAppDispatch();

    const onFilterChange = (value: string) => {
        dispatch(setFilterValur(value));
        dispatch(filterUsers());
    }

    return (
        <Form>
            <Form.Item name='gender' label='Gender' initialValue={gender}>
                <Select value={gender} onChange={onFilterChange}>
                    <Select.Option value='male'>Male</Select.Option>
                    <Select.Option value='female'>Female</Select.Option>
                    <Select.Option value='gender'>Gender</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}