
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

    clearCache(){
        this.cache = {grid:null,ids:null}
    }

    /**
     * Add a new food to the store
     * @param {Integer} x 
     * @param {Integer} y 
     */
    add(x,y){
        let chunk = new Chunk(x,y)
        this.chunks.push(chunk)
        this.clearCache()
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

    remove(idx){
        if (~idx){
            this.chunks.splice(idx,1)
            this.clearCache()
        }
    }
}