import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Area from './component/Area'
import RoomList from './component/RoomList'
import io from 'socket.io-client'

let socket = io.connect(location.host);

class App extends Component {
  state = {tiles:[],rooms:[]}

  componentWillMount() {
    socket.on('coin found', this.coinFound);
    socket.on('tile used', this.tileUsed);
  }

  componentDidMount() {
    this.playSound();
  }
  
  coinFound = (data) => {}
  tileUsed = (data) => {}

  tileClicked = (tile) => {
    console.log(tile);
    socket.emit('tile click', {
      user: localStorage.getItem('user'),
      tile
    });
  }

  createRoom = () => {
    let roomName = prompt("Oda adı giriniz", "Hodri meydan " + Math.ceil(Math.random()*500));
    fetch('/v1/room/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token':'token123'
      },
      body: JSON.stringify({
        name: roomName
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  getRooms = () => {
    fetch('/v1/room/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token':'token123'
      }
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({rooms:json});
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  playSound = () => {
    let elm = ReactDOM.findDOMNode(this.sound);
    console.log(elm);
    elm.play();
  }

  render() {
    return (
      <div>
        <audio ref={(node)=>{this.sound=node}} src="static/sound/coin.mp3" />
        <RoomList createRoom={this.createRoom} refreshRooms={this.getRooms} rooms={this.state.rooms}/>
        <Area onClick={this.playSound} tiles={this.state.tiles} tileClick={this.tileClicked}/>
      </div>
    );
  }
}

export default App;
