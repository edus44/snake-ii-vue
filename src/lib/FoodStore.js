
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
    }

    /**
     * Add a new food to the store
     * @param {Integer} x 
     * @param {Integer} y 
     */
    add(x,y){
        let chunk = new Chunk(x,y)
        this.chunks.push(chunk)
    }

    /**
     * Returns the foods paintGrid
     * @return {Object} Paintgrid
     */
    getPaintGrid(){
        let grid = {}
        for( let idx=0; idx<this.chunks.length; idx++ ){
            let chunk = this.chunks[idx]
            grid[chunk.id] = 'FOOD@f'
        }
        return grid
    }

    /**
     * Get all food chunk ids
     * @return {Array<String>} Chunk ids
     */
    getIds(){
        return this.chunks.map(chunk=>chunk.id)
    }
}