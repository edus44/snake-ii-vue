<template>
    <svg 
        class="board"
        :width="width"
        :height="height"
    >
        <Cell
            v-for="cell in cells"
            :data="cell"
        ></Cell>
    </svg>
</template>

<script>

import Cell from './Cell'
import Game from '../lib/Game'
import * as figureMaps from '../lib/figureMaps'

let cols = 120
let rows = 60
let size = 16

let game = window.game = new Game(cols,rows)
game.foodStore.add(11,2)

export default {
    data(){
        return {
            numCols: cols,
            numRows: rows,
            width: cols*size,
            height: rows*size,
            cells: [],
        }
    },
    created(){
        window.document.addEventListener('keydown',e=>{
            game.keyPressed(e.keyCode)
        })

        let relWidth = 100 / this.numCols
        let relHeight = 100 / this.numRows

        game.on('paintGrid', paintGrid => {
            let cells = []
            for(let id in paintGrid){
                let figureMap = figureMaps[paintGrid[id]]
                id = id.split('-')
                cells.push({
                    x: id[0],
                    y: id[1],
                    w: relWidth,
                    h: relHeight,
                    figureMap,
                })
            }
            this.cells = cells
        })
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