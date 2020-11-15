import {
    STORE_PACKAGES,
} from '../constants/Packages';

const initialState = {
    Packages: {
    },
};

const Packages = (state = initialState, action) => {
    if (action.type === STORE_PACKAGES) {
        return {
            ...state,
            Packages: action.payload.Packages,
        };
    }
    return state;
};

export default Packages;
