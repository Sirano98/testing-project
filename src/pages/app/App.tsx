import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Edit } from '../edit/Edit';
import { Users } from '../users/Users';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Divider } from 'antd';

export const App: FC = () => {
    return (
        <>
            <Divider />
            <Routes>
                <Route path='/' element={<Users />} />
                <Route path='edit' element={<Edit />} />
            </Routes>
            <ToastContainer />
        </>
    );
};

