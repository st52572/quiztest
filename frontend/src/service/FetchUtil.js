import AuthService from "../service/AuthService";


class FetchUtil {

    createFetchPost(body) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify(body)
        };


    }
    createFetchPostNoBearer(body) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    }

    createFetchGet(body) {
        return  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify(body)
        };

    }
    createFetchGetNoBearer(body) {
        return  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

    }
}

export default new FetchUtil();