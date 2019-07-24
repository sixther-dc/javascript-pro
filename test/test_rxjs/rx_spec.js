const { range } = require('rxjs');
const { map, filter, scan, take, reduce } = require('rxjs/operators');
const { expect } = require("chai");

describe("Rxjs的测试用例", function(){
    it("test1", function(){
        // var a = 1;
        // expect(a).to.be.equals(1);
        const source$ = range(1, 5).pipe(
            take(3),
            scan( (acc, value) => {
                // console.log("acc: " + acc);
                // console.log("value: " + value);
                return(acc + value)
            }, 0),
            reduce((acc, value) => acc + value)
        )
        source$.subscribe(
            value => {
                console.log(value);
                expect(value).to.be.equal(10);
            }
        )
    })
})
