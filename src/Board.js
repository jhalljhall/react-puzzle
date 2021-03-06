import React from 'react'
import Tile from './Tile'
import Upload from './Upload'
import Buttons from './Buttons'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tilePositions: [],
        }
        this.showMove = this.showMove.bind(this)
        this.generateTilePositions = this.generateTilePositions.bind(this)
        this.randomizeBoard = this.randomizeBoard.bind(this)
        this.checkWin = this.checkWin.bind(this)
    }

    componentDidUpdate() {
        this.checkWin()
    }

    componentDidMount() {
        this.generateTilePositions()
    }

    generateTilePositions() {
        let tilePositions = []

        let boardSize = 16 //Let this be an available input for user to set size

        for (let i = 0; i < boardSize; i++) {
            let obj = {
                currentPosition: i,
                winPosition: i,
                type: "regular",
            }
            tilePositions.push(obj)
        }
        let bpos = this.findMe(0, tilePositions);
        tilePositions[bpos].type = "blank";
        this.setState({
            tilePositions: tilePositions,
        })
    }

    showMove(currentClicked) {

        //console.log(currentClicked)
        let tempPositions = this.state.tilePositions
        let zeroObj = this.state.tilePositions.find(i => i.currentPosition === 0)
        let clickedObj = this.state.tilePositions[currentClicked]

        let zpos = this.findMe(zeroObj.currentPosition, this.state.tilePositions);
        let cpos = this.findMe(clickedObj.currentPosition, this.state.tilePositions);
        //console.log({clickedObj, zeroObj})
        //console.log({cpos, zpos})

        let clickRow = parseInt((cpos) / 4)
        let clickCol = (cpos) % 4

        let blankRow = parseInt((zpos) / 4)
        let blankCol = (zpos) % 4

        let canSwitch = false;

        //console.log({blankRow, blankCol})
        //console.log({clickRow, clickCol})
           
        if (clickRow === blankRow && Math.abs(blankCol - clickCol) === 1) {
            canSwitch = true;
        } else if (clickCol === blankCol && Math.abs(blankRow - clickRow) === 1) {
            canSwitch = true;
        } else {
            canSwitch = false;
        }
        
        if(canSwitch){
            
            tempPositions[cpos].type = "blank";
            tempPositions[zpos].type = "regular";
            //console.log({clickedObj, zeroObj})
            let tmp = tempPositions[cpos].currentPosition;
            tempPositions[cpos].currentPosition = zeroObj.currentPosition;
            tempPositions[zpos].currentPosition = tmp;

            this.setState({
                tilePositions: tempPositions
            })
        }
     
    }

    findMe(p, arr){
        let k = 0;
        for (let i = 0; i < arr.length; i++){
            if(arr[i].currentPosition === p){
                k = i;
                break;
            }
        }
        return k;
    }

    randomizeBoard() {
        //swap tiles once, and call it a random number of times

        //console.log("here")
        let tempPositions = this.state.tilePositions
        for (let i = tempPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = tempPositions[i].currentPosition
            tempPositions[i].currentPosition = tempPositions[j].currentPosition
            tempPositions[j].currentPosition = temp
            tempPositions[i].type = "regular";
            tempPositions[j].type = "regular";
        }
        let bpos = this.findMe(0, tempPositions);
        tempPositions[bpos].type = "blank";

        // if (tempPositions.currentPosition === tempPositions.winPosition) {
        //     this.randomizeBoard()
        // }

        this.setState({
            tilePositions: tempPositions
        })
    }

    checkWin() {
        let tally = 0
        for (let i = 0; i < this.state.tilePositions.length; i++) {
            if (this.state.tilePositions[i].currentPosition === this.state.tilePositions[i].winPosition) {
                tally = tally + 1
            }
        }
        if (tally === 16) {

        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 offset-4 col-sm-12">
                        <Upload />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 offset-3 col-6">
                        <div id="grid" className="row">
                            {this.state.tilePositions.map((item, index) => (
                                <Tile
                                    key={index}
                                    tempObj={item}
                                    showMove={this.showMove}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Buttons
                    randomize={this.randomizeBoard}
                />
            </div>
        )
    }
}

export default Board
