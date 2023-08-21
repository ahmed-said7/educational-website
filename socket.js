let socket=(io)=>{
    let online_users=[];
    let room_count={};
    io.on('connection',(socket)=>{
        socket.on('member-join',(data)=>{
            online_users.push({socketId:socket.id,userId:data.userId});

            if(!room_count[data.roomId]){
                room_count[data.roomId]=1
                socket.room=data.roomId;
                socket.join(data.roomId);
                io.to(socket.id).emit('room-created');
                

            }else if(room_count[data.roomId] === 1){
                
                socket.join(data.roomId);
                room_count[data.roomId] = 2;
                socket.room=data.roomId;
                io.to(socket.id).emit('room-ready');

            }else if(room_count[data.roomId] === 2){
                io.to(socket.id).emit('room-full');
            };

            socket.on('client-offer',(data)=>{
                console.log(data);
                socket.to(data.roomId).emit('server-offer',data);
            });
            socket.on('client-answer',(data)=>{
                console.log(data);
                socket.to(data.roomId).emit('server-answer',data);
            });
            socket.on('client-candidate',(data)=>{
                console.log(data);
                socket.to(data.roomId).emit('server-candidate',data);
            });
            
        });
        socket.on('client-message',(data)=>{
            let user=online_users.find((user)=> user.userId==data.recipientId);
            if(user){
                io.to(user.socketId).emit('server-message',data);
            };
        });
        socket.on('disconnect',(socket)=>{
            room_count[socket.room]-=1;
            online_users=online_users.filter((user)=>user.socketId !== socket.id);
        });
    });
}

module.exports=socket;