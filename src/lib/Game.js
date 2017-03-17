import DIR from './constants/directions'
import KEY from './constants/keyCodes'

import FoodStore from './FoodStore'
import Adder from './Adder'

import EventEmitter from 'eventemitter3'

export default class Game extends EventEmitter{

    /**
     * Create new game instace
     */
    constructor(){
        super()
        this.foodStore = new FoodStore()
        this.bounds = {
            x: 20,
            y: 9
        }
        this.cellSize = 16
        this.running = false

        this.adders = [
            // new Adder('p1',2,5,DIR.RIGHT,20,this.bounds),
            // new Adder('p2',13,8,DIR.LEFT,6,this.bounds),
            // new Adder('p3',16,10,DIR.LEFT,6,this.bounds),
            // new Adder('p4',16,2,DIR.UP,6,this.bounds),
        ]

        this.lastMoveTs = 0
        this.tickFrame = 150
        this.tickCount = 0

    }

    /**
     * Change game settings
     * @param  {Integer} options.cols     Number of columns (x)
     * @param  {Integer} options.rows     Number of rows (y)
     * @param  {Integer} options.cellSize Cell pixel size 
     * @param  {Integer} options.speed    Tick frame ms
     * @return {this}                  
     */
    setup({cols,rows,cellSize,speed}){
        if (typeof cols != 'undefined'){
            this.bounds.x = cols | 0
        }
        if (typeof rows != 'undefined'){
            this.bounds.y = rows | 0
        }
        if (typeof speed != 'undefined'){
            this.tickFrame = speed | 0
        }
        if (typeof cellSize != 'undefined'){
            this.cellSize = cellSize | 0
        }
        this.emit('setup')
        return this
    }

    /**
     * Add a new adder in a random position
     * @param  {String} username Identifier
     * @return {this}          
     */
    newAdder(username){
        let x = (Math.random()*this.bounds.x)|0
        let y = (Math.random()*this.bounds.y)|0
        this.adders.push(
            new Adder(username,x,y,DIR.RIGHT,6,this.bounds),
        )
        return this
    }

    /**
     * Remove a adder
     * @param  {String} username Identifier
     * @return {this}          
     */
    removeAdder(username){
        for(let i in this.adders){
            if  (this.adders[i].id==username){
                this.adders.splice(i,1)
                break
            }
        }
        return this
    }

    /**
     * Change adder direction
     * @param  {String} username Identifier
     * @param  {String} dir      
     * @return {this}          
     */
    adderDir(username,dir){
        for(let i in this.adders){
            if (this.adders[i].id==username){
                if (dir){
                    this.adders[i].setDir(dir)
                }
                break
            }
        }
        return this
    }

    /**
     * Return game paintgrid
     * @return {Object} Paintgrid
     */
    getPaintGrid(){
        let foodIds = this.foodStore.getIds()
        let grid = Object.assign({}, this.foodStore.getPaintGrid())
        for(let i in this.adders){
            Object.assign(grid,this.adders[i].getPaintGrid(foodIds))
        }
        return grid
    }

    /**
     * Start game animation loop
     * @return {this} 
     */
    start(){
        this.running = true
        this.loop()
        return this
    }

    /**
     * Pause game animation loop
     * @return {this} 
     */
    pause(){
        this.running = false
        return this
    }

    /**
     * Main animation loop
     * @return {void} 
     */
    loop(){
        if (!this.running)
            return

        window.requestAnimationFrame(this.loop.bind(this))

        //Check time past
        if ( Date.now() - this.lastMoveTs >= this.tickFrame ){
            this.tick()
        }
    }

    /**
     * Tick logic
     * @return {void} 
     */
    tick(){

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

        this.lastMoveTs = Date.now()
        this.tickCount++
        this.emit('tick',this.getPaintGrid())
    }

    /**
     * Key bindins
     * @param  {Number} key Keycode
     * @return {this}     
     */
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
        return this
    }
}