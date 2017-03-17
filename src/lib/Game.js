import * as DIR from './directions'
import * as KEY from './keyCodes'

import FoodStore from './FoodStore'
import Adder from './Adder'

import EventEmitter from 'eventemitter3'

export default class Game extends EventEmitter{
    constructor(){
        super()
        this.foodStore = new FoodStore()
        this.bounds = {
            x: 20,
            y: 9
        }
        this.cellSize = 16

        this.adders = [
            // new Adder('p1',2,5,DIR.RIGHT,20,this.bounds),
            // new Adder('p2',13,8,DIR.LEFT,6,this.bounds),
            // new Adder('p3',16,10,DIR.LEFT,6,this.bounds),
            // new Adder('p4',16,2,DIR.UP,6,this.bounds),
        ]

        this.lastMoveTs = 0
        this.tickFrame = 150
        this.tickCount = 0

        this.tick()
    }
    setup({cols,rows,cellSize,speed}){
        if (cols) this.bounds.x = cols
        if (rows) this.bounds.y = rows
        if (speed) this.tickFrame = speed
        if (cellSize) this.cellSize = cellSize
        this.emit('setup')

    }
    newAdder(username){
        let x = (Math.random()*this.bounds.x)|0
        let y = (Math.random()*this.bounds.y)|0
        this.adders.push(
            new Adder(username,x,y,DIR.RIGHT,6,this.bounds),
        )
    }
    removeAdder(username){
        for(let i in this.adders){
            if  (this.adders[i].id==username){
                this.adders.splice(i,1)
                break
            }
        }
    }
    adderDir(username,dir){
        for(let i in this.adders){
            if (this.adders[i].id==username){
                if (dir){
                    this.adders[i].setDir(dir)
                }
                break
            }
        }
    }
    getPaintGrid(){
        let foodIds = this.foodStore.getIds()
        let grid = Object.assign({}, this.foodStore.getPaintGrid())
        for(let i in this.adders){
            Object.assign(grid,this.adders[i].getPaintGrid(foodIds))
        }
        return grid
    }

    tick(){
        window.requestAnimationFrame(this.tick.bind(this))

        //Check time past
        let now = Date.now()
        if ( now - this.lastMoveTs < this.tickFrame ){
            return
        }

        //Food ids
        let foodIds = this.foodStore.getIds()

        //Snake movement and eating
        for(let i in this.adders){
            this.adders[i].turn()
            this.adders[i].move()
            this.foodStore.remove(
                this.adders[i].eat(foodIds)
            )
        }

        //Collect all snake ids
        let addersChunkIds = this.adders.map( adder => adder.getIds())

        //Check adder collisions
        for(let i in this.adders){
            this.adders[i].turnUnlock()
            for(let j in this.adders){
                this.adders[i].checkCrash(addersChunkIds[j],i==j)
            }
        }

        //Food random add
        if (this.tickCount % 20 === 0){
            this.foodStore.addRandom(this.bounds)
        }

        this.lastMoveTs = now
        this.tickCount++
        this.emit('tick',this.getPaintGrid())
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