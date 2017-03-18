<template>
    <svg 
        class="board"
        :width="width"
        :height="height"
    >

        <FigurePool
            :w=" 100 / cols "
            :h=" 100 / rows "
        ></FigurePool>

        <template v-for="y in rows">
            <template v-for="x in cols">
                <Cell 
                    :id="(x-1)+'-'+(y-1)"
                    :x="( ( 100 / cols ) * ( x - 1 ) )" 
                    :y="( ( 100 / rows ) * ( y - 1 ) )"
                ></Cell>
            </template>
        </template>

        <Score></Score>

    </svg>
</template>

<script>

import Cell from './Cell'
import FigurePool from './FigurePool'
import Score from './Score'

export default {
    inject:['game'],
    data(){
        return {
            cols: 0,
            rows: 0,
            width: 0,
            height: 0
        }
    },
    created(){
        this.updateSize()
        this.game.on('setup',this.updateSize.bind(this))
    },
    methods:{
        updateSize(){
            this.cols = this.game.bounds.x,
            this.rows = this.game.bounds.y,
            this.width = this.game.bounds.x * this.game.cellSize,
            this.height = this.game.bounds.y * this.game.cellSize
        }
    },
    components: {Cell,FigurePool,Score}
}

</script>

<style lang="less">
@import '../assets/common';
svg.board {
    background-color: @board-bg-color;
    display: block;
    margin:auto
}
</style>