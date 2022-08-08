import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { IPagination, IResponse } from "../../models/IResponse";
import { toast } from "react-toastify";

interface UserState {
    users: IUser[],
    userToEdit: IUser | null,
    pagination: IPagination | null,
    isLoading: boolean,
    isError: boolean
}

const initialState: UserState = {
    users: [],
    userToEdit: localStorage.getItem("userToEdit") ? JSON.parse(localStorage.getItem("userToEdit") || "") : null,
    pagination: null,
    isLoading: false,
    isError: false
}

export const fetchUsers = createAsyncThunk<IResponse, number>(
    'users/fetchUsers',
    async (page) => {
        const response = await fetch(`https://gorest.co.in/public/v1/users?page=${page || 1}`);

        const data = await response.json();

        return data;
    }
)

export const editUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
    'users/editUsers',
    async (user, { rejectWithValue }) => {
        const response = await fetch(`https://gorest.co.in/public/v1/users/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN || ""
                },
                body: JSON.stringify(user)
            });

        if (!response.ok) {
            return rejectWithValue("Something went wrong");
        }

        const data = await response.json();

        return data
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUserToEdit(state, action: PayloadAction<IUser>) {
            state.userToEdit = action.payload;
            localStorage.setItem("userToEdit", JSON.stringify(state.userToEdit));
        }
    },
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
            .addCase(fetchUsers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(editUser.fulfilled, (state) => {
                toast.success("Data have been edited successfully", {
                    position: "bottom-left"
                })
            })
            .addCase(editUser.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "bottom-left"
                })
            })
            .addCase(editUser.pending, (state) => {
                toast.info("Data have sended", {
                    position: "bottom-left"
                })
            })
    }
})

export const { addUserToEdit } = userSlice.actions;

export default userSlice.reducer;