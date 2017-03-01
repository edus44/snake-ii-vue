import * as DIR from './directions'
import * as KEY from './keyCodes'

import FoodStore from './FoodStore'
import Adder from './Adder'

import EventEmitter from 'eventemitter3'

export default class Game extends EventEmitter{
    constructor(numCols,numRows){
        super()
        this.foodStore = new FoodStore()
        this.bounds = {
            x: numCols,
            y: numRows
        }
        this.adder = new Adder(9,5,DIR.RIGHT,6,this.bounds)

        this.lastMoveTs = 0
        this.tickFrame = 100

        this.tick()
    }
    getPaintGrid(){
        return Object.assign(
            this.foodStore.getPaintGrid(),
            this.adder.getPaintGrid(this.foodStore.getIds())
        )
    }

    tick(){
        let now = Date.now()
        if ( now - this.lastMoveTs > this.tickFrame ){
            this.adder.move()
            this.lastMoveTs = now
            this.emit('paintGrid',this.getPaintGrid())
        }
        window.requestAnimationFrame(this.tick.bind(this))
    }

    keyPressed(key){
        if(key == KEY.UP){
            this.adder.setDir(DIR.UP)
        } else if(key == KEY.LEFT){
            this.adder.setDir(DIR.LEFT)
        } else if(key == KEY.DOWN){
            this.adder.setDir(DIR.DOWN)
        } else if(key == KEY.RIGHT){
            this.adder.setDir(DIR.RIGHT)
        } else if(key == KEY.START){
            // this.tick()
        }
    }
}