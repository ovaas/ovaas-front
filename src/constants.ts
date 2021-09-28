const isDev = import.meta.env.DEV

export const DEMO_API_ENDPOINT = import.meta.env.VITE_FUNCTIONS_ENDPOINT
export const API_ENDPOINT = isDev ? '/api/v1' : import.meta.env.VITE_BACKEND_ENDPOINT

export const allowFileTypes = ['image/jpeg', 'image/png']
