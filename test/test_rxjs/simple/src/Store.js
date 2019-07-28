//store由一个数据结构以及绑定在其身上的一些recuder方法组成
import {createStore} from 'redux';
import Reducer from './Reducer.js';
const initValue = {
    count: 0,
    name: 'dc'
}
export default createStore(Reducer, initValue);
