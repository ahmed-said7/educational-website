let socket=io();
let localStream;
let remoteStream=new MediaStream();

// let peerConnection=new RTCPeerConnection();
let isCreated=false;

localStream=navigator.mediaDevices.getUserMedia({video:true,audio:false}).then((stream)=>{
    localStream=stream;
    document.querySelector('.user-1').srcObject=localStream;
});



const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }]
}

peerConnection=new RTCPeerConnection(servers);

socket.emit('member-join',{userId,roomId});

socket.on('room-full',()=>{
    alert('rooom-full');
});


socket.on('room-created',async()=>{
    // peerConnection=new RTCPeerConnection();
    // 
    let offer=await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('client-offer',{
        offer,
        roomId
    });
})


socket.on('room-ready',()=>{
    socket.on('server-offer',async(data)=>{
        // peerConnection=new RTCPeerConnection(servers);
        await peerConnection.setRemoteDescription(data.offer);
        let answer=await peerConnection.createAnswer();
        console.log(data);
        await peerConnection.setLocalDescription(answer);
        socket.emit('client-answer',{
            answer,
            roomId
        });
    })
});

let sendCandidate=()=>{
    peerConnection.onicecandidate=function(event){
        if(event.candidate){
            socket.emit('client-candidate',{
                candidate:event.candidate,
                roomId
            })
        };
    };
}

socket.on('server-candidate',(data)=>{
    console.log(data);
    peerConnection.addIceCandidate(data.candidate);
});

socket.on('server-answer',async(data)=>{
        await peerConnection.setRemoteDescription(data.answer);
    });

let init =async ()=>{

    // peerConnection=new RTCPeerConnection(servers);
    sendCandidate();
    
    localStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track,localStream);
    });
    
    peerConnection.ontrack=(event)=>{
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    };
    
    document.querySelector('.user-2').srcObject=remoteStream;
};
init();
