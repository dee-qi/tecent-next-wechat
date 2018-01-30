var footer = document.querySelector('.footer');
footer.addEventListener('click', function(){
    var cp = document.querySelector('.chat-page');
    cp.className = cp.className + " selecting";
}, false);