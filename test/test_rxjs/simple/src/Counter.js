import React from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { scan, map } from 'rxjs/operators';

//只负责显示
// const CounterView = ({count, onIncrement, onDecrement}) => {
//     return(
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={onIncrement}>+</button>
//             <button onClick={onDecrement}>-</button>
//         </div>
//     )
// };

class CounterView extends React.Component {
    constructor() {
        super(...arguments)
    }
    render() {
        return(
            <div>
                <h1>Count: {this.props.count}</h1>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
            </div>
        )
    }
}

//真正处理数据逻辑
// export default class Counter extends React.Component {
//     state = {count: 0};
//     onDecrement()  {
//         this.setState({count: this.state.count - 1});
//     };
//     onIncrement() {
//         console.log(this.state);
//         this.setState({count: this.state.count + 1});
//     };
//     render() {
//         //bind{this} 是绑定到类实例化之后的实例this上
//         return(
//             <CounterView
//                 count = {this.state.count}
//                 onDecrement = {this.onDecrement.bind(this)}
//                 onIncrement = {this.onIncrement.bind(this)}
//             />
//         )
//     }
// }

// export default class Counter extends React.Component {
//     constructor() {
//         super(...arguments);
//         this.state = {count: 0};
//         this.counter = new Subject();
//         this.counter.pipe(
//             scan((result, inc) => result + inc, 0)
//         ).subscribe(
//             value => {
//                 this.setState({count: value})
//                 console.log(value);
//             }
//         )
//     };
//     //Maximum update depth exceeded. 如果onDecrement直接写语句（非函数）时会出现这个报错， 只要调用了setState方法，就会重新调用render方法，然后就会一直执行下去
//     render() {
//         console.log("render function of Counter component invoked.")
//         return(
//             <CounterView
//                 count = {this.state.count}
//                 onDecrement = {() => this.counter.next(1)}
//                 onIncrement = {() => this.counter.next(-1)}
//             />
//         )
//     }
// }

//高阶组件， 生成组件的组件
const observe = (WrappedComponent, observableFactory, defaultState) => {
    return class extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {count: defaultState};
            this.props$ = observableFactory(this.props, this.state);
        }

        render() {
            console.log('tttt');
            return <WrappedComponent {...this.state}/>
        }
        componentWillUnmount() {
            this.subscription.unsubscribe();
        }
        //没有mount之前不能setState, 因为ui还都没有
        componentDidMount() {
            this.subscription = this.props$.subscribe(value => {
                this.setState(value);
            });
            this.props$.next(0);
        }
    }
}

export default observe(
    CounterView,
    () => {
        //BehaviorSubject每次都能拿到最新的数据
        // const counter = new BehaviorSubject(0);
        //Subject需要先subscribe, 然后执行next才能获取到数据;
        const counter = new Subject();
        return counter.pipe(
            scan((result, inc) => result + inc, 0),
            map( value => ({
                count: value,
                onIncrement: () => counter.next(1),
                onDecrement: () => counter.next(-1)
            }))
        )
    },
    0
)
