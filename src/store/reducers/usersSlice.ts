import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ColumnsType } from "antd/lib/table";
import { IUser } from "../../models/IUser";
import { IPagination, IResponse } from "../../models/IResponse";

interface UserState {
    users: IUser[],
    pagination: IPagination | null,
    columns: ColumnsType<IUser>,
    isLoading: boolean,
    isError: boolean
}

const initialState: UserState = {
    users: [],
    pagination: null,
    isLoading: false,
    isError: false,
    columns: [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
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
}

export const fetchUsers = createAsyncThunk<IResponse, number, { rejectValue: string }>(
    'users/fetchUsers',
    async (page, { rejectWithValue }) => {
        const response = await fetch(`https://gorest.co.in/public/v1/users?page=${page || 1}`);
        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data = await response.json();

        return data;
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.data.map(user => {
                    return { ...user, key: user.id }
                });
                state.pagination = action.payload.meta.pagination;
                state.isLoading = false;
                state.isError = false;
            })
    }
})

export default userSlice.reducer;