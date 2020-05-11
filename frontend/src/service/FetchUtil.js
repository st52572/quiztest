import AuthService from "../service/AuthService";


class FetchUtil {

    createFetchPost(body, url) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify(body)
        };
        return fetch(url, options);

    }

    createFetchPostNoBearer(body, url) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        return fetch(url, options);
    }

    createFetchGet(url) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
        };
        return fetch(url, options);
    }

    createFetchGetNoBearer(url) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return fetch(url, options);
    }
}

export default new FetchUtil();