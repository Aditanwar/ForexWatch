import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async (currentToken) => {
        const token = currentToken || localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete api.defaults.headers.common['x-auth-token'];
            dispatch({ type: 'AUTH_ERROR' });
            return;
        }

        try {
            const res = await api.get('/auth/user');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (formData) => {
        try {
            const res = await api.post('/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            loadUser(res.data.token);
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
            throw err;
        }
    };

    const register = async (formData) => {
        try {
            const res = await api.post('/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            loadUser(res.data.token);
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
            throw err;
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
