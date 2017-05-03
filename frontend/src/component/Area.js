import React from 'react'
import Tile from './Tile'
import './Area.css'

class Area extends React.Component {
    state = {}

    render() {
        return <div className="area">
            {Array(400).fill(0).map((item, index) => {
                    return <Tile key={index} onTileClick={this.props.tileClick} index={index}/>
                })}
        </div>
    }
}

export default Area;