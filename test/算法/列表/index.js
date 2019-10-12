function List() {
    this.dataStore = [];
    this.listSize = 0;
    this.append = append;
    this.toString = toString;
    this.find = find;
    this.remove = remove;
    //此处是赋值，所以第一次的length的值已经被固化了
    // this.length = this.listSize;
    this.length = length;
    this.insert = insert;
    this.clear = clear;
    this.pos = 0;
    //返回当前元素
    this.getElement = getElement;
    //将当前元素移动到第一个元素
    this.front = front;
    //将当前元素移动到最后一个元素
    this.end = end;
    //将当前位置前移一位
    this.prev = prev;
    //将当前位置后移一位
    this.end = end;
    //将当前位置移动到指定位置
    this.moveTo = moveTo;
}
function append(element){
    this.dataStore[this.listSize++] = element;
};

function find(element) {
    return this.dataStore.indexOf(element);
}

function remove(element) {
    var fountAt = this.find(element);
    if (fountAt > -1) {
        this.dataStore.splice(fountAt, 1);
        --this.listSize;
        return true;
    } else {
        return false
    }
}
function toString() {
    return this.dataStore;
}

function length() {
    return this.listSize;
}

function insert(element, after){
    var insertPos = this.dataStore.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0 ,element);
        ++this.listSize;
    } else {
        return false;
    }
}

function clear(){
    delete this.dataStore;
    this.dataStore = 0;
    this.listSize = 0;
    this.pos = 0;
}

function getElement() {
    return this.dataStore[this.pos];
}

function front() {
    this.pos = 0;
};
function end() {
    this.pos = this.listSize - 1;
}

function prev() {
    if(this.pos > 0) {
        --this.pos;
    }
};
function next() {
    if(this.pos < this.listSize - 1) {
        ++this.pos;
    }
}
function moveTo(pos) {
    this.pos = pos;
}
var alist = new List();
console.log(alist.length())  // 0
alist.append(1);
alist.append(3);
console.log(alist.listSize); //2
console.log(alist.length());  //2
console.log(alist.toString()); //[1,3]
alist.remove(3);
alist.append(5);
alist.append(6);
alist.append(7);
alist.append(8);
console.log(alist.toString()); //[1]
console.log(alist.getElement());