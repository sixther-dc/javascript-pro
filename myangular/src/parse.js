//将字符串转换为funtion， 包含四个部分
//lexer   字符串转换为一个数组
//AST Builder  构建抽象语法树  obj形式的
//AST Compiler   将AST编译为Javascript函数
//Parser
function parse(expr) {
    var lexer = new Lexer;
    var parser = new Parser(lexer);
    return parser.parser(expr);
}

function Lexer() {

}

//将传入的字符串转化为类型数组
Lexer.prototype.lex = function (text) {
    this.text = text;
    this.index = 0;
    this.tokens = [];
    while (this.index < this.text.length) {
        this.ch = this.text.charAt(this.index);
        if (this.isNumber(this.ch) || (this.ch === '.' && this.isNumber(this.peek()))) {
            this.readNumber()
        } else if (this.ch === '"' || this.ch === '\'') {
            this.readString()
        } else if (this.isIdent(this.ch)) {
            this.readIndet()
        } else if (this.ch === '[' || this.ch === ']') {
            this.tokens.push({
                text: this.ch
            });
            this.index++;
        } else if (this.isWhitespace(this.ch)) {
            this.index++;
        } else {
            throw 'Unexpected next character: ' + this.ch;
        }
    }
    console.log(this.tokens);
    return this.tokens;
    //token序列化
};

//返回index的下一个字符
Lexer.prototype.peek = function () {
    return this.index < this.text.length - 1 ?
        this.text.charAt(this.index + 1) :
        false;
};

Lexer.prototype.isNumber = function (ch) {
    return ch >= '0' && ch <= '9'
}

Lexer.prototype.isIdent = function (ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
        ch === '_' || ch === '$';
};
//处理空格
Lexer.prototype.isWhitespace = function (ch) {
    return ch === ' ' || ch === '\r' || ch === '\t' ||
        ch === '\n' || ch === '\v' || ch === '\u00A0';
};

Lexer.prototype.readNumber = function () {
    var number = '';
    while (this.index < this.text.length) {
        var ch = this.text.charAt(this.index);
        if (this.isNumber(ch) || ch == '.') {
            number += ch
        } else {
            break
        };
        this.index++
    }

    this.tokens.push({
        text: number,
        value: Number(number)
    })
}

Lexer.prototype.readString = function () {
    this.index++;
    var string = '';
    while (this.index < this.text.length) {
        var ch = this.text.charAt(this.index);
        if (ch === '"' || ch === '\'') {
            this.tokens.push({
                text: string,
                value: string
            });
            return
        } else {
            string += ch
        }
        this.index++
    };
}

Lexer.prototype.readIndet = function () {
    var text = '';
    while (this.index < this.text.length) {
        var ch = this.text.charAt(this.index);
        if (this.isIdent(ch)) {
            text += ch
        } else {
            break
        };
        this.index++
    }

    this.tokens.push({
        text: text,
        value: text
    })
}

function AST(lexer) {
    this.lexer = lexer;
}

AST.Program = 'Program';
AST.Literal = 'Literal';
AST.ArrayExpression = 'ArrayExpression';
AST.Identifier = 'Identifier';
AST.prototype.constants = {
    'null': {
        type: AST.Literal,
        value: null
    },
    'true': {
        type: AST.Literal,
        value: true
    },
    'false': {
        type: AST.Literal,
        value: false
    }
};
AST.prototype.ast = function (text) {
    //构建AST
    this.tokens = this.lexer.lex(text);
    return this.program()
};

AST.prototype.program = function () {
    return {
        type: AST.Program,
        body: this.primary()
    };
}

AST.prototype.peek = function (e) {
    if (this.tokens.length > 0) {
        var text = this.tokens[0].text;
        if (text === e || !e) {
            return this.tokens[0];
        }
    }
};

AST.prototype.primary = function () {
    console.log(this.peek(), '33333');
    if (this.expect('[')) {
        return this.arrayDeclaration();
    } else if (this.constants.hasOwnProperty(this.tokens[0].text)) {
        return this.constants[this.tokens[0].text]
    } else if (this.peek().indetifier) {
        return this.indetifier()
    } else {
        return this.constant();
    }
}

AST.prototype.identifier = function () {
    return {
        type: AST.Identifier,
        name: this.consume().text
    };
};
AST.prototype.constant = function () {
    return {
        type: AST.Literal,
        value: this.tokens[0].value
    }
}

AST.prototype.expect = function (e) {
    if (this.tokens > 0) {
        if (this.tokens[0].text = e || !e) {
            return this.tokens.shift()
        }
    }
}

AST.prototype.arrayDeclaration = function () {
    this.consume(']');
    return {
        type: AST.ArrayExpression
    };
}

AST.prototype.consume = function (e) {
    var token = this.expect(e);
    if (!token) {
        throw 'Unexpected. Expecting: ' + e;
    }
    return token;
};

function ASTCompiler(astBuilder) {
    this.astBuilder = astBuilder;
}

ASTCompiler.prototype.compile = function (text) {
    //生成函数
    var ast = this.astBuilder.ast(text);
    this.state = {
        body: []
    }
    this.recurse(ast);
    console.log(this.state.body.join(''));
    //第一个参数为函数的参数
    return new Function('s', this.state.body.join(''));
};
//递归处理抽象语法树
ASTCompiler.prototype.recurse = function (ast) {
    switch (ast.type) {
        case AST.Program:
            this.state.body.push("return ", this.recurse(ast.body), ';')
        case AST.Literal:
            return this.escape(ast.value)
        case AST.ArrayExpression:
            return '[]';
        case AST.Indetifier:
            return this.nonComputedMember('s', ast.name);
    }
}

ASTCompiler.prototype.nonComputedMember = function (left, right) {
    return '(' + left + ').' + right;
};

//对于字符串自动加上引号
ASTCompiler.prototype.escape = function (value) {
    if (typeof (value) == 'string') {
        return '\'' + value + '\'';
    } else {
        return value;
    }
};

function Parser(lexer) {
    this.lexer = lexer;
    this.ast = new AST(this.lexer);
    this.astCompiler = new ASTCompiler(this.ast);
}
Parser.prototype.parser = function (text) {
    return this.astCompiler.compile(text);
};

module.exports = parse;