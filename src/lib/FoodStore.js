
import Chunk from './Chunk'

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
    add(x,y){
        let chunk = new Chunk(x,y)
        this.chunks.push(chunk)
        this.clearCache()
        return this
    }

    /**
     * Add a food in a random position
     * @param {Object} bounds Game board bounds
     * @return {this}
     */
    addRandom(bounds){
        this.add(
            (Math.random() * bounds.x)|0,
            (Math.random() * bounds.y)|0
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
            for( let idx=0; idx<this.chunks.length; idx++ ){
                let chunk = this.chunks[idx]
                grid[chunk.id] = 'FOOD@f'
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
            this.chunks.splice(idx,1)
            this.clearCache()
        }
        return this
    }
}