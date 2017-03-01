<template>
    <svg 
        class="board"
        :width="width"
        :height="height"
    >
        <template v-for="y in numRows">
            <template v-for="x in numCols">
                <Cell 
                    :x="( ( 100 / numCols ) * ( x - 1 ) )" 
                    :y="( ( 100 / numRows ) * ( y - 1 ) )"
                    :w="( 100 / numCols )"
                    :h="( 100 / numRows )"
                    :id="(x-1)+'-'+(y-1)"
                ></Cell>
            </template>
        </template>
    </svg>
</template>

<script>

import Cell from './Cell'
import Game from '../lib/Game'

let cols = 80
let rows = 40
let size = 16

let game = window.game = new Game(cols,rows)
game.foodStore.add(11,2)
import bus from '../lib/bus'

export default {
    data(){
        return {
            numCols: cols,
            numRows: rows,
            width: cols*size,
            height: rows*size
        }
    },
    rendered(){
        console.log('rendered')
        // window.document.addEventListener('keydown',e=>{
        //     game.keyPressed(e.keyCode)
        // })
        // game.on('paintGrid', painGrid => {
        //     bus.emit('paintGrid',painGrid)
        // })
    },
    components: {Cell}
}

</script>

<style lang="less">
@import '../assets/common';
svg.board {
    background-color: @board-bg-color;
    display: block;
    // margin:100px auto;
}
</style>