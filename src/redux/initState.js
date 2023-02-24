import { reduxState } from "./constants"


export const initState = {
    user: {
        group: '9-gr',
        name: '',
        email: '',
        token: '',
    },

    // filter: {
    //     search: '',
    // }
}

export const getInitState = () => {
    const dataFromLS = window.localStorage.getItem(reduxState)

    return dataFromLS ? JSON.parse(dataFromLS) : initState
}