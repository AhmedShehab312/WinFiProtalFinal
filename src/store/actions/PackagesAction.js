import {
    STORE_PACKAGES,
} from '../constants/Packages';


function StorePackages(Packages) {
    return {
        type: STORE_PACKAGES,
        payload: { Packages },
    };
}


export { StorePackages };
