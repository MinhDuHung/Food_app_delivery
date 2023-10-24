export const saveUser = (
    name, email, id, avatar,
) => async dispatch => {
    try {
        dispatch({
            type: 'SAVE_CURRENT_USER',
            name: name,
            email: email,
            id: id,
            avatar: avatar,
        });
    } catch (error) {
        // Handle error
    }
};
