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
        });

        if (res.status === 401) {
            throw new Error('Неверные логин или пароль');
        }
        if (res.status === 404) {
            throw new Error('Пользователь с указанным email не найден');
        }
        if (res.status >= 300) {
            throw new Error(`Ошибка, код ${res.status}`);
        }

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

    async getProductById(id, token) {
        const res = await fetch(`${this.url}/products/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        return res.json()
    }

    getProductsByIds(ids, token) {
        return Promise.all(
            ids.map(id => fetch(`${this.url}/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }).then((res) => res.json())),
        );
    }

    async getReviewsById(id, token) {
        const res = await fetch(`${this.url}/products/review/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        return res.json()
    }

    async addReviewById(id, token, values) {
        const res = await fetch(`${this.url}/products/review/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(values),
        })

        return res.json()
    }

    async addNewProduct(values, token) {
        const res = await fetch(`${this.url}/products`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(values),
        })

        return res.json()
    }

    async deleteProduct(id, token) {
        const res = await fetch(`${this.url}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })

        return res.json()
    }

    async editProduct(id, token, values) {
        const res = await fetch(`${this.url}/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(values),
        })

        return res.json()
    }
}

const api = new Api('9-gr');

export { api }    