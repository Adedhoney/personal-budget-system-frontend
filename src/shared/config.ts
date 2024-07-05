const envs = ['BASE_BACKEND_URL', 'PORT', 'NODE_ENV'];

envs.forEach((value, index) => {
    value;
    if (import.meta.env[envs[index]]) {
        const message = 'Fatal Error: env ' + envs[index] + ' not defined';

        throw new Error(message);
    }
});

export default {
    ENVIRONMENT: import.meta.env.NODE_ENV,
    PORT: Number(import.meta.env.PORT),
    BASE_BACKEND_URL: import.meta.env.VITE_BASE_BACKEND_URL,
};
