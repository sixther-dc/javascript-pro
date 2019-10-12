function Stack() {
    this.dataStore = [];
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.top = 0;
    this.length = length;
}

function push(element) {
    this.dataStore[this.top++] = element;
};

function pop() {
    return this.dataStore[--this.top];
}

function peek() {
    return this.dataStore[this.top - 1];
}

function length() {
    return this.top;
}
var as = new Stack();
as.push("a");
as.push("b");
as.push("c");

console.log(as.pop());
console.log(as.peek());
console.log(as.peek());
console.log(as.dataStore);

//使用栈的场景
//栈可以处理循环的场景

//判断一个字符串是否会回文
function isPalindrome(word) {
    var s = new Stack();
    for(i=0; i<word.length; i++) {
        s.push(word[i])
    }

    var rWord = "";
    while (s.length() > 0) {
        rWord += s.pop()
    };
    console.log(rWord);
    if (word == rWord) {
        return true
    } else {
        return false
    }
}

console.log(isPalindrome('tfrrft'))  //true


//使用栈来实现递归(阶乘)

function fact(n) {
    var s = new Stack();
    while (n>0) {
        s.push(n--)
    };
    var result = 1;
    while (s.length() > 0) {
        result *= s.pop();
    }

    return result
}

console.log(fact(10));

//判断括号是否匹配
//括号的分布刚好类似于回文结构
function isBrackets(i) {
    return (i=='(') || (i==')') || (i=='[') || (i=='|') || (i=='{') || (i=='}')
}
function isLeftBrackets(i) {
    return (i=='(') || (i=='[') || (i=='{')
}
function isRightBrackets(i) {
    return (i==')') || (i==']') || (i=='}')
}

function isMatchBrackets(i, j) {
    return (i=='(' && j==')') || (i=='[' && j==']') || (i=='{' && j=='}')
}

function isCloseBrackets(text) {
    var s = new Stack();
    for (var i=0; i<text.length; i++) {
        if(isLeftBrackets(text[i])) {
            s.push(text[i]);
        };
        if(isRightBrackets(text[i])) {
            //出现右括号之前栈里有没有东西
            if(s.length() > 0) {
                //判断括号是否闭合
                if (isMatchBrackets(s.peek(), text[i])) {
                    s.pop();
                }
            } else {
                return false;
            }
        }
    }
    if (s.length() > 0) {
        return false;
    } else {
        return true;
    }
}

console.log(isCloseBrackets("(sa[{dfa]sf)"));  //false
console.log(isCloseBrackets(")sa"));

//后缀表达式求值
// "1 2 +"