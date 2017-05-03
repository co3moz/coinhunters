import React from 'react'
import './Tile.css'

class Tile extends React.Component{
    state = {
        used:false,
        coin:false,
    }

    render(){
        return <div onClick={()=>{this.props.onTileClick(this.props.index)}} className={'tile' + (this.state.coin ? ' coin' : '') + (this.state.used ? ' empty' : '') }></div>
    }
}

export default Tile;