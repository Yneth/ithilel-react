import axios from "axios";

const API_URL = 'https://6446c78eee791e1e2908ce74.mockapi.io';
const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const client = axios.create({
    timeout: 30000,
    baseURL: API_URL,
});


client.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);
    return originalResponse;
});


function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = Date.parse(value);
        else if (typeof value === "object") handleDates(value);
    }
}

export default client;