const initState = {
    orders: []
}
export default function actionReducer(state = initState, payload) {
    switch (payload.type) {
        case 'ADD_NEW_ORDERS':
            return {
                ...state,
                orders: [...state.orders, payload.order],
            };
        case 'CHANGE_QUANTITY':
            const { index, newQuantity } = payload;
            const updatedOrders = state.orders.map((order) => {
                if (order.index == index) {
                    return {
                        ...order,
                        quantity: newQuantity,
                    };
                }
                return order;
            });

            return {
                ...state,
                orders: updatedOrders,
            };
        case 'DELETE_ALL_ORDERS':
            return {
                ...state,
                orders: [],
            };
        case 'DELETE_ONE_ORDER':
            const { orderIndex } = payload;
            const filteredOrders = state.orders.filter((order) => order.index !== orderIndex);

            return {
                ...state,
                orders: filteredOrders
            };
        default:
            return state
    }

}