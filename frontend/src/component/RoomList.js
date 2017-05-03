import React from 'react'
import Room from './Room'
import './RoomList.css'

class RoomList extends React.Component{

    state = {
        rooms : [
            {id:1,name:"Hodri meydan"},
            {id:2,name:"Hodri meydan 2"},
            {id:3,name:"Hodri meydan 3"},
            {id:4,name:"Hodri meydan 4"}
        ]
    }

    render(){
        return <div className="rooms">
            <div className="room-battle" onClick={this.props.createRoom}><span>Medan Oku</span></div>
            <div className="room-title" onClick={this.props.refreshRooms}><span>Aktif Odalar (Yenile)</span></div>
            <div className="room-list">
                {this.state.rooms.map((room)=>{
                    return <Room key={room.name} room={room}/>
                })}
            </div>
        </div>
    }
}

export default RoomList;
