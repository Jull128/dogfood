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
    async auth(values) {
        const res = await fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        return res.json()
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

    async me(token) {
        const res = await fetch(`${this.url}/v2/${this.groupId}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        return res.json()

    }

    async getProducts(search, token) {
        const res = await fetch(`${this.url}/products?query=${search}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        return res.json()
    }

}

const api = new Api('9-gr');

export { api }    