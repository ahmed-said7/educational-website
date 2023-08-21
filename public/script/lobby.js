let sendButton=document.querySelector('.send');

let roomId=document.querySelector('.roomId');

sendButton.addEventListener('click',function(event){
    let room=roomId.value;
    roomId.value='';
    window.location=`http://localhost:4010/video/lobby/${userId}/${room}`
})