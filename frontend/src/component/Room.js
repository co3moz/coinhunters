import React from 'react'
import './Room.css'

class Room extends React.Component{
    render(){
        return <div className="room-item"><span>{this.props.room.name}</span></div>
    }
}

export default Room;