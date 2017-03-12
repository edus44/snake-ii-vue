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
        <text x="0" y="16" font-size="16">
            <tspan v-for="adder in players">
                {{adder.id}}: {{adder.num}}
            </tspan>
        </text>
    </svg>
</template>

<script>



import * as figureMaps from '../lib/figureMaps'
import Cell from './Cell'
import Game from '../lib/Game'
// import dp from '../lib/dp'

let cols = 60
let rows = 30
let size = 16

let game = window.game = new Game(cols,rows)
import bus from '../lib/bus'




export default {
    provide:{figureMaps},
    data(){
        return {
            numCols: cols,
            numRows: rows,
            width: cols*size,
            height: rows*size,
            players:[]
        }
    },
    created(){
        window.document.addEventListener('keydown',e=>{
            game.keyPressed(e.keyCode)
        })
        game.on('paintGrid', paintGrid => {
            bus.emit('paintGrid',paintGrid)
            this.players = game.adders.map(adder=>({
                id: adder.id,
                num: adder.chunks.length
            }))
        })
        // dp.on('keyPressed', key => {
            // game.keyPressed(key)
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
}
</style>