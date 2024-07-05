import axios, { AxiosError } from 'axios';
import {
    Record,
    User,
    addNewRecord,
    setAccessToken,
    setDeleteRecord,
    setRecords,
    setUpdateRecord,
    setUserInfo,
    setUserRole,
    store,
} from './redux';
import config from './config';
import { errorMessage, successMessage } from './alert';

const enum responseStatus {
    success = 'success',
    error = 'error',
}

export const signUp = async (signUpInfo: {
    email: string;
    username: string;
    password: string;
}) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/account/sign-up`,
            { data: signUpInfo },
        );
        successMessage(response.data.message);
    } catch (error) {
        errorMessage(((error as AxiosError).response?.data as any).message);
    }
};

export const doLogin = async (loginInfo: {
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/account/login`,
            { data: loginInfo },
        );

        successMessage(response.data.message);
        localStorage.setItem('token', response.data.data.token);
        store.dispatch(setAccessToken(response.data.data.token));
        store.dispatch(setUserInfo(response.data.data.user));
        store.dispatch(setUserRole(response.data.data.user.role));
    } catch (error) {
        errorMessage(((error as AxiosError).response?.data as any).message);
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${config.BASE_BACKEND_URL}/account`, {
            headers: {
                authorization: `Basic ${store.getState().app.accessToken}`,
            },
        });
        store.dispatch(setUserInfo(response.data.data.user));
        store.dispatch(setUserRole(response.data.data.user.role));
    } catch (error) {
        console.log(error);
        if (
            ((error as AxiosError).response?.data as any).message ===
            'Unauthorized'
        ) {
            logout();
        }
    }
};

export const addRecord = async (record: Record) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/record`,
            { data: record },
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );

        successMessage(response.data.message);
        store.dispatch(addNewRecord(response.data.data.record));
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
    }
};

export const getRecord = async (id: string) => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/record/${id}`,
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        return response.data.record as Record;
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        }
        // throw error
    }
};

export const getAllRecords = async () => {
    try {
        const response = await axios.get(`${config.BASE_BACKEND_URL}/record`, {
            headers: {
                authorization: `Basic ${store.getState().app.accessToken}`,
            },
        });
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        store.dispatch(setRecords(response.data.data.records));
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        }
        // throw error
    }
};

export const updateRecord = async (record: Record, id: string) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/record/update/${id}`,
            { data: record },
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );

        successMessage(response.data.message);
        store.dispatch(setUpdateRecord(response.data.data.record));
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
        // throw error
    }
};
export const deleteRecord = async (id: string) => {
    try {
        const response = await axios.delete(
            `${config.BASE_BACKEND_URL}/record/${id}`,
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );

        successMessage(response.data.message);
        store.dispatch(setDeleteRecord(response.data.data.record.id));
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
        // throw error
    }
};

// ADMIN CALLS

export const adminGetUsers = async () => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/admin/user`,
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        return response.data.data.users as User[];
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        }
        // throw error
    }
};
export const adminGetUserById = async (id: string) => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/admin/user/${id}`,
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        return response.data.data.user as User;
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        }
        // throw error
    }
};
export const adminActivateUser = async (id: string) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/admin/user/activate/${id}`,
            {},
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );

        successMessage(response.data.message);
        return;
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
        // throw error
    }
};

export const adminMakeUserAdmin = async (id: string) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/admin/user/make-admin/${id}`,
            {},
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        successMessage(response.data.message);
        return;
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
        // throw error
    }
};

export const adminDeleteUser = async (id: string) => {
    try {
        const response = await axios.delete(
            `${config.BASE_BACKEND_URL}/admin/user/${id}`,
            {
                headers: {
                    authorization: `Basic ${store.getState().app.accessToken}`,
                },
            },
        );
        if (response.data.status !== responseStatus.success) {
            throw new Error(response.data.message);
        }
        successMessage(response.data.message);
        return;
    } catch (error) {
        if ((error as Error).message === 'Unauthorized') {
            logout();
        } else {
            errorMessage(((error as AxiosError).response?.data as any).message);
        }
        // throw error
    }
};

export const logout = () => {
    localStorage.clear();
    window.location.reload();
};
