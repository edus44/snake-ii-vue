
import DIR from '../constants/directions'

/**
 * Identifies a position in the grid
 */
export default class Chunk{

    /**
     * Create a new chunk
     * @param  {Integer} x    
     * @param  {Integer} y    
     * @param  {Object} meta Optional
     */
    constructor(x,y,meta){
        this.x = x
        this.y = y
        this.meta = meta || {}
    }

    /**
     * Return a new chunk based on this one
     * @param  {Boolean} withMeta 
     * @return {Chunk} New chunk instance
     */
    clone(withMeta){
        return new this.constructor( this.x, this.y, withMeta && Object.assign({},this.meta) )
    }

    /**
     * Unset meta property
     * @return {Chunk} this
     */
    cleanMeta(){
        this.meta = {}
        return this
    }

    /**
     * Copy other chunk properties to itself
     * @param  {Chunk} chunk    
     * @param  {Boolean} withMeta Copy also meta
     * @return {Chunk} this
     */
    assign(chunk,withMeta){
        this.x = chunk.x
        this.y = chunk.y
        if (withMeta)
            this.meta = Object.assign({},chunk.meta)
        return this
    }

    /**
     * Return conventional position id
     * @return {String} Position identifier
     */
    get id(){
        return this.x+'-'+this.y
    }

    /**
     * Move itself position to inverse direction
     * @param  {String} dir    Direction id
     * @param  {Object} bounds {x,y} with bounds
     * @return {Chunk} this
     */
    unshift(dir,bounds){
        if (dir == DIR.RIGHT)
            this.x--
        else if (dir == DIR.LEFT)
            this.x++
        else if (dir == DIR.UP)
            this.y++
        else if (dir == DIR.DOWN)
            this.y--
        return this.resolveBounds(bounds)
    }

    /**
     * Move itself position to direction
     * @param  {String} dir    Direction id
     * @param  {Object} bounds {x,y} with bounds
     * @return {Chunk} this
     */
    shift(dir,bounds){
        if (dir == DIR.RIGHT)
            this.x++
        else if (dir == DIR.LEFT)
            this.x--
        else if (dir == DIR.UP)
            this.y--
        else if (dir == DIR.DOWN)
            this.y++
        return this.resolveBounds(bounds)
    }

    /**
     * Fit itself position inside bounds
     * @param  {Object} bounds {x,y} with bounds
     * @return {Chunk} this
     */
    resolveBounds(bounds){
        if (this.x < 0)
            this.x = bounds.x-1
        else if (this.x >= bounds.x)
            this.x = 0
        else if (this.y < 0)
            this.y = bounds.y-1
        else if (this.y >= bounds.y)
            this.y = 0
        return this
    }


    /**
     * Return tru if other chunk is in the same position
     * @param  {Chunk} other 
     * @return {Boolean}       
     */
    overlapsTo(other){
        return other.x == this.x && other.y == this.y 
    }
}