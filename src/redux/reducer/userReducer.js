import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        image: '',
        roleId: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log('check actions : ', action);
            return {
                ...state, account: {
                    email: action?.payload?.email,
                    image: action?.payload?.image,
                    roleId: action?.payload?.roleId
                },
                isAuthenticated: true
            };

        default: return state;
    }
};

export default userReducer;