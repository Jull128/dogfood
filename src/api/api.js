class Api {
    constructor(groupId) {
        this.url = `https://api.react-learning.ru`;
        this.groupId = groupId;
    }

    //регистрация
    async reg(values) {
        const res = await fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });

        if (res.status === 409) {
            throw new Error('Юзер с указанным email уже существует');
        }
        if (res.status === 400) {
            throw new Error('Некорректно заполнено одно из полей');
        }
        if (res.status >= 300) {
            throw new Error(`Ошибка, код ${res.status}`);
        }
    }


    // авторизация
    auth(values) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
    }

    allUsers(token) {
        return fetch(`${this.url}/v2/${this.groupId}/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    }

    me(token) {
        return fetch(`${this.url}/v2/${this.groupId}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })

    }

    getProducts(token) {
        return fetch(`${this.url}/products`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    }

}

const api = new Api('9-gr');

export { api }    