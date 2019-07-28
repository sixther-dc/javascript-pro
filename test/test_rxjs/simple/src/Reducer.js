//为定义在store上的一系列方法, 有试用方通过dispatch来调用

import * as actionTypes from './ActionTypes';

const recuder =  (state, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            console.log(state);
            //此处的state是store的数据结构
            return { ...state, count: state.count + 1 };
        case actionTypes.DECREMENT:
            return {...state, count: state.count -1 };
        default:
            return state;
    }
}

export default recuder