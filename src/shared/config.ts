// import { getFileRootDir } from '@application/Utils';
import dotenv from "dotenv"

dotenv.config()

const envs = ["BASE_BACKEND_URL", "PORT", "NODE_ENV"]

envs.forEach((value, index) => {
    if (!process.env[envs[index]]) {
        const message =
            "Fatal Error: env " +
            envs[index] +
            " not defined"

        throw new Error(message)
    }
})

export default {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
}
