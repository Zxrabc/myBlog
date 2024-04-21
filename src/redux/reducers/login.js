
const initState = {isLogin:false}

export default (preState = initState, action) => {
    const {type,data} = action
    switch(type){
        case 'loginOrExit':
            return {preState,isLogin:data}
        default:
            return preState
    }
}