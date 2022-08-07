import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Users } from '../users/Users';
import './App.css';

export const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Users />} />
            </Routes>
        </>
    );
};

