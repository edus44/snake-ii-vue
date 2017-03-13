<template>
    <svg
        class="cell"
        :x="x + '%'" 
        :y="y + '%'" 
        :width="w + '%'" 
        :height="h + '%'"
    >
        <rect
            v-if="figure"
            v-for="r in figureMaps[figure]"
            :class="`c-${color} s-${status}`"
            :x="( r[0] * 25 ) + '%'"
            :y="( r[1] * 25 ) + '%'"
        ></rect>
    </svg>
</template>

<script>

import * as figureMaps from '../lib/figureMaps'
import bus from '../lib/bus'

export default {
    inject:['figureMaps'],
    props:['x','y','w','h','id'],
    data(){
        return {
            figure: null,
            color: null,
            status: null,
        }
    },
    created(){
        this.figureMaps = figureMaps
        bus.on('paintGrid',paintGrid=>{
            let figureData = paintGrid[this.id]
            let figure,color,status

            if (figureData){
                figureData = figureData.split('@')
                figure = figureData[0]
                color = figureData[1] 
                status = figureData[2] 
            }

            if (figure != this.figure || status!=this.status){
                this.figure = figure || null
                this.color = color || 'f'
                this.status = status || 'def'
            }
        })
    }
}


</script>

<style lang="less">
@import '../assets/common';

svg.cell rect{
    fill:@front-color;
    width: 25%;
    height: 25%;
    stroke:@board-bg-color;
    stroke-width:2%;

    &.c-p1{
        fill:#2240c0;
    }
    &.c-p2{
        fill:#ba143e;
    }
    &.c-p3{
        fill:#ffb410;
    }
    &.c-p4{
        fill:#8c35ee;
    }
    &.s-locked{
        stroke:white;
        fill-opacity:.8;
    }
}

</style>