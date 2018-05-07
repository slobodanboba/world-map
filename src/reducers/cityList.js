
const defaultState = {
    cities: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'CITY_LIST':
            return {
                ...state,
                cities: [...action.city]
            };
        default:
            return state;
    }
};
