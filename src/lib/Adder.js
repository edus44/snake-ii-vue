
import * as DIR from './directions'
import Chunk from './Chunk'

/**
 * Snake entity
 */
export default class Adder{

    /**
     * Create a new adder
     * @param  {Integer} x      Initial head position X
     * @param  {Integer} y      Initial head position Y
     * @param  {String} dir    Initial head direction
     * @param  {Integer} len    Initial adder body length
     * @param  {Object} bounds {x,y} board size
     */
    constructor(id,x,y,dir,len,bounds){
        this.id = id
        this.dir = dir
        this.nextDirs = []
        this.ateFood = []
        this.chunks = []
        this.bounds = bounds

        //Head
        this.chunks.push(new Chunk(x,y))

        for(let i=0;i<len;i++)
            this.grow()
    }

    /**
     * Add new dir to nextDirs buffer
     * @param {String} dir Direction id
     */
    setDir(newDir){
        let prevDir = this.nextDirs[this.nextDirs.length - 1] || this.dir
        if (newDir != prevDir && (
                (prevDir == DIR.LEFT  && newDir != DIR.RIGHT) || 
                (prevDir == DIR.RIGHT && newDir != DIR.LEFT) || 
                (prevDir == DIR.UP && newDir != DIR.DOWN) || 
                (prevDir == DIR.DOWN && newDir != DIR.UP)
            )){
            this.nextDirs.push(newDir)
        }
    }

    /**
     * Add a chunk to the after the tail
     * @return {Adder} this
     */
    grow(){
        let tailIdx = this.chunks.length - 1
        let newTail = this.chunks[tailIdx].clone()
        let tailDir = this._getChunkIndexDir(tailIdx)
        newTail.unshift(tailDir,this.bounds)
        this.chunks.push(newTail)
        return this
    }

    /**
     * Calcs the chunk direction inside the adder
     * @param  {Integer} idx Chunk index
     * @return {String} Direction found
     */
    _getChunkIndexDir(idx){
        if (idx == 0)
            return this.dir

        let chunk = this.chunks[idx]
        let next = this.chunks[idx-1]

        let dX = chunk.x - next.x
        let dY = chunk.y - next.y

        //Take into account diffs bigger than 1 or -1 (through bounds)
        if (dX == 1 || dX < -1)
            return DIR.LEFT
        else if (dX == -1 || dX > 1)
            return DIR.RIGHT
        else if (dY == 1 || dY < -1)
            return DIR.UP
        else
            return DIR.DOWN

    }

    /**
     * Construct the figure for a chunk
     * @param  {Chunk} chunk 
     * @param  {Integer} idx   Chunk index
     * @param  {Array<String>} foods Array of food ids
     * @return {String}       Figure string id
     */
    _getFigure(chunk,idx,foods){

        let chunkDir = this._getChunkIndexDir(idx)
        let figure

        if ( idx == 0 ){
            figure = 'HEAD'

            //Open mouth
            if (foods && foods.length){
                let aheadChunk = chunk.clone().shift(chunkDir,this.bounds)
                if (~foods.indexOf(aheadChunk.id)){
                    figure += '_MOUTH'
                }
            }
        }else if( idx == this.chunks.length - 1 ){
            figure = 'TAIL'
        }else{
            figure = 'BODY'
            //Food digesting
            if (chunk.meta.food){
                figure += '_FOOD'
            }

            //Corner
            let prevChunkDir = this._getChunkIndexDir(idx+1)
            if (chunkDir != prevChunkDir){
                figure += '_CORNER_'+prevChunkDir
            }
        }

        figure += '_'+chunkDir
        return figure
    }

    /**
     * Returns the adder paintGrid
     * @return {Object} Paintgrid
     */
    getPaintGrid(foods){
        let grid = {}
        for( let idx=0; idx<this.chunks.length; idx++ ){
            let chunk = this.chunks[idx]
            let figure = this._getFigure(chunk,idx,foods)
            // grid[chunk.id] = figure
            grid[chunk.id] = `${figure}@${this.id}`
        }
        return grid
    }

    /**
     * Move the adder to next position
     * @return {Adder} this
     */
    move(){
        this.dir = this.nextDirs.shift() || this.dir

        for(let idx = this.chunks.length-1; idx >= 0; idx--){
            let chunk = this.chunks[idx]

            if (idx==0){
                chunk.shift(this.dir,this.bounds).cleanMeta()
            }else{
                let nextChunk = this.chunks[idx-1]
                chunk.assign(nextChunk,true)
            }
        }
        return this
    }

}
