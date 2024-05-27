'use server'

import { methods } from "./methodsEnum";

export default async function callApi(method: methods, URI: string, body: any = null) {
    const url = `${process.env.NEXT_PUBLIC_GOTCHA_API}/${URI}`;
    let myHeaders = new Headers(
        {
            'Content-Type': 'application/json',
        }
    );

    let configCall: RequestInit = {
        method: methods[method].toString(),
        headers: myHeaders,
    };

    if (method !== methods.GET) {
        configCall.body = JSON.stringify(body)
    }
    try {
        const r = await fetch(url, configCall);
        if (!r.ok) {
            if (r.status === 401) {
                localStorage.clear();
                window.location.pathname = '/';
            }

            if (r.status === 403) {
                localStorage.clear();
                window.location.pathname = '/';
            }

            const errResponse = await r.json();
            throw errResponse;
        }
        else {
            if (r.status === 204) return;
            if (r.status === 201) return;

            return await r.json();
        }
    } catch (err_1) {
        throw err_1;
    }
}