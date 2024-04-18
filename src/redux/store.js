// 引入createStore,用于创建store对象
import {createStore,combineReducers} from 'redux'
// 引入为Login组件服务的reducer
import loginReducer from './reducers/login'

// 引入redux-persist相关
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 配置持久化
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['login']  // 白名单，支持持久化组件
}


const allReducers = combineReducers({
    login: loginReducer
})

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {store, persistor}