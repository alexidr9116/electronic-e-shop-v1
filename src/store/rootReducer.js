import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
import settingReducer from './slice/setting';
import notificationReducer from './slice/notification';
import shoppingReducer from './slice/shopping';
const rootPersistConfig = {
    key:'root',
    storage,
    keyPrefix:'redux-',
    whitelist:['setting'],
}

const rootReducer = combineReducers({
    notification:notificationReducer,
    setting:settingReducer,
    shopping:shoppingReducer
});
export {rootPersistConfig, rootReducer};