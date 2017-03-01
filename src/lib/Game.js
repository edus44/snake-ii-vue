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
        this.adders = [
            new Adder(9,5,DIR.RIGHT,6,this.bounds),
            new Adder(14,8,DIR.LEFT,6,this.bounds)
        ]


        this.lastMoveTs = 0
        this.tickFrame = 100

        this.tick()
    }
    getPaintGrid(){
        let foodIds = this.foodStore.getIds()
        return Object.assign(
            this.foodStore.getPaintGrid(),
            this.adders[0].getPaintGrid(foodIds),
            this.adders[1].getPaintGrid(foodIds)
        )
    }

    tick(){
        let now = Date.now()
        if ( now - this.lastMoveTs > this.tickFrame ){
            this.adders[0].move()
            this.adders[1].move()
            this.lastMoveTs = now
            this.emit('paintGrid',this.getPaintGrid())
        }
        window.requestAnimationFrame(this.tick.bind(this))
    }

    keyPressed(key){
        if(key == KEY.P1_UP){
            this.adders[0].setDir(DIR.UP)
        } else if(key == KEY.P1_LEFT){
            this.adders[0].setDir(DIR.LEFT)
        } else if(key == KEY.P1_DOWN){
            this.adders[0].setDir(DIR.DOWN)
        } else if(key == KEY.P1_RIGHT){
            this.adders[0].setDir(DIR.RIGHT)
        } else 

        if(key == KEY.P2_UP){
            this.adders[1].setDir(DIR.UP)
        } else if(key == KEY.P2_LEFT){
            this.adders[1].setDir(DIR.LEFT)
        } else if(key == KEY.P2_DOWN){
            this.adders[1].setDir(DIR.DOWN)
        } else if(key == KEY.P2_RIGHT){
            this.adders[1].setDir(DIR.RIGHT)
        } else 

        if(key == KEY.START){
            this.tick()
        }
    }
}