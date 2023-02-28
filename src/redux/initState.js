import { reduxState } from "./constants"


export const initState = {
    user: {
        token: '',
        group: '9-gr',
        name: '',
        email: '',
        avatar: '',
        about: '',
    },

    filter: {
        search: '',
    }
}

export const getInitState = () => {
    const dataFromLS = window.localStorage.getItem(reduxState)

    return dataFromLS ? JSON.parse(dataFromLS) : initState
}