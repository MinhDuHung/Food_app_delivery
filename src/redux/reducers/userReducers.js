const initState = {
    name: '',
    email: '',
    id: 0,
    avatar: '',
}
export default function actionReducer(state = initState, payload) {
    switch (payload.type) {
        case 'SAVE_CURRENT_USER':
            return {
                name: payload.name,
                email: payload.email,
                id: payload.id,
                avatar: payload.avatar,
            }

        default:
            return state
    }
}