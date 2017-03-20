
import Chunk from './Chunk'
const BUG_TYPES = ['A','B','C','D','E']

/**
 * Store available foods
 */
export default class FoodStore{

    /**
     * Create the store
     */
    constructor(){
        this.chunks = []
        this.clearCache()
    }

    /**
     * Clears inner cache
     * @return {this} 
     */
    clearCache(){
        this.cache = {grid:null,ids:null}
        return this
    }

    /**
     * Add a new food to the store
     * @param {Integer} x 
     * @param {Integer} y 
     * @return {this} 
     */
    add(x,y,meta){
        let chunk = new Chunk(x,y,meta)
        this.chunks.push(chunk)
        this.clearCache()
        return this
    }

    addRandomBug(bounds){
        let x = (Math.random() * (bounds.x-1))|0
        let y = (Math.random() * bounds.y)|0
        let i = (Math.random() * BUG_TYPES.length)|0

        this.add(x, y, {
            mode: 'BUG',
            type: BUG_TYPES[i],
            section: 1
        })
        this.add(x+1, y, {
            mode: 'BUG',
            type: BUG_TYPES[i],
            section: 2
        })
    }

    /**
     * Add a food in a random position
     * @param {Object} bounds Game board bounds
     * @return {this}
     */
    addRandom(bounds){
        this.add(
            (Math.random() * bounds.x)|0,
            (Math.random() * bounds.y)|0,
            {mode:'REGULAR'}
        )
        return this
    }

    /**
     * Returns the foods paintGrid
     * @return {Object} Paintgrid
     */
    getPaintGrid(){
        if (!this.cache.grid){
            let grid = {}
            for( let i=0; i<this.chunks.length; i++ ){
                let chunk = this.chunks[i]

                //Behaviour
                grid[chunk.id]  = 'FOOD'

                //Mode
                grid[chunk.id] += '_'+chunk.meta.mode

                //Type
                if (chunk.meta.type)
                    grid[chunk.id] += '_'+chunk.meta.type

                //Section
                if (chunk.meta.section)
                    grid[chunk.id] += '_'+chunk.meta.section

                //Color
                grid[chunk.id] += '@f'
            }
            this.cache.grid = grid
        }
        return this.cache.grid
    }

    /**
     * Get all food chunk ids
     * @return {Array<String>} Chunk ids
     */
    getIds(){
        if (!this.cache.ids)
            this.cache.ids = this.chunks.map(chunk=>chunk.id)
        return this.cache.ids
    }

    /**
     * Remove a food chunk index
     * @param  {Number} idx Index of the food
     * @return {this}
     */
    remove(idx){
        if (~idx){
            let [chunk] = this.chunks.splice(idx,1)
            if (chunk.meta.mode == 'BUG'){
                if (chunk.meta.section == 2)
                    idx--
                this.chunks.splice(idx,1)
            } 
            this.clearCache()
        }
        return this
    }
}