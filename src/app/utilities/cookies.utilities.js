'use server';
import { cookies } from "next/headers";

export const persistSession = (username, password, id) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration to 7 days from now

    const sessionData = { username, password, id };
    const sessionValue = JSON.stringify(sessionData);

    cookies().set("user", sessionValue, { expires: expirationDate });
};

export const persistAuthToken = (user_id) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration to 7 days from now

    cookies().set("token" + user_id, user_id, { expires: expirationDate });
};

export const clearSession = (name) => {
    cookies().delete(name);
};

export const getSession = async (name) => {
    const cookie = cookies().get(name);
    return cookie;
};

export const logOut = () => {
    clearSession("user");
};

export const login = (id, username, password) => {
    persistSession(username, password, id)
};
