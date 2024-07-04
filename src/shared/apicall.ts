import axios from "axios"
import {
    setAccessToken,
    setUserInfo,
    setUserRole,
    store,
} from "./redux"
import config from "./config"

const enum responseStatus {
    success = "success",
    error = "error",
}

export const signUp = async (signUpInfo: {
    email: string
    username: string
    password: string
}) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/account/sign-up`,
            signUpInfo
        )
        if (
            response.data.status !== responseStatus.success
        ) {
            throw new Error(response.data.message)
        }
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const doLogin = async (loginInfo: {
    email: string
    password: string
}) => {
    try {
        const response = await axios.post(
            `${config.BASE_BACKEND_URL}/account/login`,
            loginInfo
        )
        if (
            response.data.status !== responseStatus.success
        ) {
            throw new Error(response.data.message)
        }
        localStorage.setItem("token", response.data.token)
        store.dispatch(setAccessToken(response.data.token))
        store.dispatch(setUserInfo(response.data.user))
        store.dispatch(setUserRole(response.data.user.role))
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const getAccess = async () => {
    try {
        const response = await axios.get(
            `${config.BASE_BACKEND_URL}/account`,
            {
                headers: {
                    authorization: `Basic ${
                        store.getState().app.accessToken
                    }`,
                },
            }
        )

        if (
            response.data.status !== responseStatus.success
        ) {
            throw new Error(response.data.message)
        }
        store.dispatch(setUserInfo(response.data.user))
        store.dispatch(setUserRole(response.data.user.role))
    } catch (error) {
        console.error("Login error:", error)
    }
}
