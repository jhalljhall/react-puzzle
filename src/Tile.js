import React from 'react'
import './Tile.css'

class Tile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            position: -1
        }
        this.switchTile = this.switchTile.bind(this)
    }

    componentDidMount(){
        this.setState({
            position: this.props.currentPosition,
            type: this.props.type
        })
    }

    componentDidUpdate() {

    }

    switchTile(e) {
        e.preventDefault();
        console.log("click worked")
        this.props.showMove(this.state.position)

        // if (this.state.position === 0) {
        //     this.setState({
        //         position: 1
        //     })
        // }
    }

    render() {

        return (
            <div onClick={this.switchTile} id="tile" className="col-md-3 border">
                <div className="text-center">{this.state.position}</div>
            </div>
        )
    }

}

    export default Tile
