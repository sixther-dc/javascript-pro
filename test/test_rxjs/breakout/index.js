/* global Rx */
const stage = document.getElementById("stage");
const context = stage.getContext('2d');
context.fillStyle = "green";

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 10;
const BRICK_ROWS = 6;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;
//球拍的移动速速
const PADDLE_SPEED = 240;
const BALL_SPEED = 100;
const PADDLE_CONTROLS = {
    'ArrowLeft': -1,
    'ArrowRight': 1
}

const initState = {
    ball: {
        position: {
            x: stage.width / 2,
            y: stage.height - PADDLE_HEIGHT - BALL_RADIUS
        },
        direction: {
            x: 1,
            y: -1
        }
    },
    paddle: {
        position: stage.width / 2
    },
    bricks: createBricks(),
    score: 0
}

//显示游戏说明
function drawIntro() {
    context.clearRect(0, 0, stage.width, stage.height);
    context.textAlign = "center";
    context.font = '24px Courier New';
    context.fillText("Press [<] and [>]", stage.width / 2, stage.height / 2);
}


//绘制球拍
function drawPaddle(position) {
    context.beginPath();
    context.rect(
        position - PADDLE_WIDTH / 2,
        stage.height - PADDLE_HEIGHT,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );
    context.fill();
    context.closePath();
}

function drawScore(score) {
    context.font = "16px";
    context.fillText(score, BRICK_GAP, 16)
}
function createBricks() {
    let width = (stage.width - BRICK_GAP * (BRICK_COLUMNS + 1)) / BRICK_COLUMNS;
    let bricks = [];
    for (i = 0; i < BRICK_ROWS; i++) {
        for (j = 0; j < BRICK_COLUMNS; j++) {
            bricks.push({
                x: BRICK_GAP * (j + 1) + j * width,
                y: BRICK_GAP * (i + 1) + i * BRICK_HEIGHT + 16,
                width: width,
                height: BRICK_HEIGHT
            })
        }
    }
    return bricks;
}

function drawDrick(brick) {
    context.beginPath();
    context.rect(
        brick.x,
        brick.y,
        brick.width,
        brick.height
    );
    context.fill();
    context.closePath();
}

function drawDricks(bricks) {
    bricks.forEach(brick => {
        drawDrick(brick)
    })
}

function drawBall(ball) {
    context.beginPath();
    context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

let nextPaddlePosation = initState.paddle.position;

const time$ = Rx.Observable
    //保持60hz的刷新率
    .interval(1000 / 60, Rx.Scheduler.requestAnimationFrame)
    .map(() => ({
        time: Date.now(),
        deltaTime: null
    }))
    .scan((previous, current) => ({
        time: current.time,
        deltaTime: (current.time - previous.time) / 1000
    }))

const keys$ = Rx.Observable
    //merge先到先得
    .merge(
        Rx.Observable.fromEvent(document, 'keydown').map(event => (PADDLE_CONTROLS[event.key] || 0)),
        //释放按键
        Rx.Observable.fromEvent(document, 'keyup').map(event => (0))
    )
    //对数据去重
    .distinctUntilChanged();


//判断球跟砖块是否碰撞
function isCollision(brick, ball) {
    return ball.position.x > brick.x &&
        ball.position.x < brick.x + brick.width &&
        ball.position.y > brick.y &&
        ball.position.y < brick.y + brick.height
}

//采用subject来作为控制器，实现对事件流的操控
let controler$ = new Rx.Subject(); 

//结合时间流以及鼠标时间来控制球拍的位置
time$.withLatestFrom(keys$)
        .merge(controler$)
        .map(value => {
    //更新球拍的位置数据
    initState.paddle.position = initState.paddle.position + value[0].deltaTime * PADDLE_SPEED * value[1];
    //检测球跟砖块的碰撞
    initState.bricks.forEach((brick) => {
        //删除碰撞到的砖块，并且使球专项
        if (isCollision(brick, initState.ball)) {
            let brickIndex = initState.bricks.indexOf(brick);
            initState.bricks.splice(brickIndex, 1);
            initState.score ++;
            initState.ball.direction.y = 1;
        }

        if (initState.ball.position.y < BALL_RADIUS) {
            initState.ball.direction.y = 1;
        } 
        if (initState.ball.position.x > (stage.width - BALL_RADIUS)) {
            initState.ball.direction.x = -1
        }
        if (initState.ball.position.x < BALL_RADIUS) {
            initState.ball.direction.x = 1
        }

        if ((initState.ball.position.y > (stage.height - PADDLE_HEIGHT - BALL_RADIUS))) {
            if ((initState.ball.position.x > initState.paddle.position - PADDLE_WIDTH / 2) && (initState.ball.position.x < initState.paddle.position + PADDLE_WIDTH / 2)) {
                initState.ball.direction.y = -1
            }
            else {
                if (initState.ball.position.y >= stage.height - BALL_RADIUS) {
                    console.log(initState.ball.position.x, initState.paddle.position);
                    controler$.error("faild")
                }
            }
        }

        if(initState.paddle.position < PADDLE_WIDTH / 2) {
            initState.paddle.position = PADDLE_WIDTH / 2;
        }

        if(initState.paddle.position > (stage.width - PADDLE_WIDTH / 2)) {
            initState.paddle.position = stage.width - PADDLE_WIDTH / 2;
        }
    })
    //更新求的位置数据
    initState.ball.position.x = initState.ball.position.x + value[0].deltaTime * BALL_SPEED * initState.ball.direction.x;
    initState.ball.position.y = initState.ball.position.y + value[0].deltaTime * BALL_SPEED * initState.ball.direction.y;

    console.log(initState);
}).subscribe(() => {
    updateView(initState);
});

function updateView(state) {
    context.clearRect(0, 0, stage.width, stage.height);
    drawPaddle(state.paddle.position);
    drawBall(state.ball);
    drawDricks(state.bricks);
    drawScore(state.score);
}
updateView(initState);
