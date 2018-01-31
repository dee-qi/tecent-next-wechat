//author:7d
//腾讯NEXT前端特训班结业项目

//第一个页面隐藏+第二个页面显示的控制
var bt = document.querySelector('.first-page-button');
        bt.addEventListener('click', function(){
            var fp = document.querySelector('.first-page');
            var sp = document.querySelector('.chat-page');
            fp.className = fp.className + ' hide';
            sp.className = sp.className.replace(' hide', '');
        }, false);

//点击对话框，显示/隐藏答案选择窗口
var footer = document.querySelector('.footer');
var cp = document.querySelector('.chat-page');
var flag = true;
function handler(){
    if(flag){
        cp.className = cp.className + ' selecting';
    } else {
        cp.className = cp.className.replace(' selecting', '');
    }
    flag = !flag;
}
footer.addEventListener('click', handler, false);


//返回一个新的message-item块
//参数msg: 要在气泡中显示的内容
//参数isLeft: 是否是左边的消息, true显示在左边, false显示在右边
function newChatItem(msg, isLeft){
    var msgItem = document.createElement('div');
    msgItem.className = isLeft ? 'message-item' : 'message-item message-item-right';
    var avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = isLeft ? './avatar/avatar1.jpg' : './avatar/avatar2.jpg';
    avatar.alt = '头像';
    var angle = document.createElement('span');
    angle.className = 'message-bubble-angle';
    var msgBubble = document.createElement('div');
    msgBubble.className = 'message-bubble';
    var p = document.createElement('p');
    var text = document.createTextNode(msg);

    p.appendChild(text);
    msgBubble.appendChild(p);
    msgItem.appendChild(avatar);
    msgItem.appendChild(angle);
    msgItem.appendChild(msgBubble);
    
    return msgItem;
}

var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var chatList = document.querySelector('.chat-list');
var questionList = [
    '作业写完了吗？？？！！！',
    '让你买的菜你买了吗？？？！！！',  
]
var aList1 = [
    '昨天就写完啦～',
    '额，马上起床写',
    '我就不写！你咋地？'
]
var aList2 = [
    '嗯，已经买好等你回来做饭啦～',
    '嗷嗷嗷，我这就去买',
    '买个菜你都叫我，你自己买不行吗！',
]
counter = -1;//用来计数，当前是第几轮问答
score = 0;//最后得分

//三个回答全部结束，结算结果的方法
function answerDone(){
    var results = [
        '你妈妈又觉得你是个好孩子了呢！',
        '你妈妈觉得你没救了。',
        '亲，快找个地方躲起来吧！',
    ]
    var tag = 0;
    if(score < 4){
        chatList.appendChild(newChatItem('真是个好孩子!', true));
    } else if(score < 8){
        chatList.appendChild(newChatItem('唉，朽木难雕!', true));
        tag = 1;
    } else {
        chatList.appendChild(newChatItem('我回去就打死你!', true));
        tag = 2;
    }
    setTimeout(()=>{
        var tips = document.querySelector('.final-tips');
        tips.querySelector('.tips-text').innerText = results[tag];
        tips.className = tips.className.replace(' hide', '');
    }, 1000);
}

function newLeft(){
    chatList.appendChild(newChatItem(questionList[counter], true));
}

//每次回答之后更新Selector里的内容
function refreshSelector(){
    console.log('refresh', counter);
    var mList = counter === 0?aList1:aList2;
    document.getElementById('a1').innerText = mList[0];
    document.getElementById('a2').innerText = mList[1];
    document.getElementById('a3').innerText = mList[2];
}


//Selector内元素的点击事件处理
function selectorHandler(event){
    var text = this.querySelector('p').firstChild.data;
    chatList.appendChild(newChatItem(text, false));
    var tag = this.querySelector('p').id;
    score += parseInt(tag.substring(1));
    counter ++;

    if(counter != 2) setTimeout(newLeft, 1000);
    if(counter === 2) {
        cp.className = cp.className.replace(' selecting', '');
        footer.removeEventListener('click', handler);
        setTimeout(answerDone, 1000);
        // answerDone();
    }
    //每次选择答案后，隐藏Selector区
    cp.className = cp.className.replace(' selecting', '');
    flag = !flag;

    setTimeout(refreshSelector,500);
    // refreshSelector(counter);
}

answer1.addEventListener('click', selectorHandler, false);
answer2.addEventListener('click', selectorHandler, false);
answer3.addEventListener('click', selectorHandler, false);
document.querySelector('.icon-replay').addEventListener('click', (event) => {
    window.location.reload()
  })
