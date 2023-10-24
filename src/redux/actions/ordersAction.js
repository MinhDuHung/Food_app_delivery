
export const addOrder = (order) => async dispatch => {
    try {
        dispatch({
            type: 'ADD_NEW_ORDERS',
            order: order,
        });
    } catch (error) {
    }
};

export const changeQuantity = (index, newQuantity) => async dispatch => {
    try {
        dispatch({
            type: 'CHANGE_QUANTITY',
            index: index,
            newQuantity: newQuantity
        });
    } catch (error) {
    }
};

export const deleteOneOrder = (orderIndex) => async dispatch => {
    try {
        dispatch({
            type: 'DELETE_ONE_ORDER',
            orderIndex: orderIndex
        });
    } catch (error) {
    }
};

export const deleteAllOrders = () => async dispatch => {
    try {
        dispatch({
            type: 'DELETE_ALL_ORDERS',
        });
    } catch (error) {
    }
};
