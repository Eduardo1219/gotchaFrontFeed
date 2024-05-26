'use server'

export default async function callApi(method: string, URI: string, body: any = null) {
    const url = `${process.env.NEXT_GOTCHA_API}/${URI}`;
    console.log(url,'url')
    let myHeaders = new Headers(
        {
            'Content-Type': 'application/json',
        }
    );

    let configCall: RequestInit = {
        method,
        headers: myHeaders,
    };

    if (method !== 'GET') {
        configCall.body = JSON.stringify(body)
    }
    console.log(url, configCall, 'fetch call')
    try {
        const r = await fetch(url, configCall);
        console.log(r,'rrr');
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

            return await r.json();
        }
    } catch (err_1) {
        throw err_1;
    }
}