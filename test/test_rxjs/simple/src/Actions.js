//声明了可以被dispatch的方法列表

import * as actionTypes from './ActionTypes';

export const increment = () => ({
    type: actionTypes.INCREMENT
})

export const decrement = () => ({
    type: actionTypes.DECREMENT
})