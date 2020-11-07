import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProfileReducer from './reducers/ProfileReducer';
import BranchesReducer from './reducers/BranchsReducer';
import GlobalReducer from './reducers/GlobalReducer';
import BrandsReducer from './reducers/BrandsReducer';

const storageReducer = combineReducers({
    ProfileState: ProfileReducer,
    BranchesState: BranchesReducer,
    GlobalState: GlobalReducer,
    BrandsState: BrandsReducer
});


const configureStore = createStore(storageReducer, applyMiddleware(thunk));

export { configureStore };
