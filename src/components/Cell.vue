<template>
    <svg
        class="cell"
        :x="x + '%'" 
        :y="y + '%'" 
        :width="w + '%'" 
        :height="h + '%'"
    >
        <rect
            v-if="figureMap"
            :class="`c-${color}`"
            v-for="r in figureMap"
            :x="( r[0] * 25 ) + '%'"
            :y="( r[1] * 25 ) + '%'"
        ></rect>
    </svg>
</template>

<script>

import * as figureMaps from '../lib/figureMaps'
import bus from '../lib/bus'

export default {
    props:['x','y','w','h','id'],
    data(){
        return {
            figureMap: null,
            color:null
        }
    },
    created(){
        this.figureMaps = figureMaps
        bus.on('paintGrid',paintGrid=>{
            let figureData = paintGrid[this.id]
            let figureMap = null
            let color = null

            if (figureData){
                figureData = figureData.split('@')
                figureMap = this.figureMaps[figureData[0]] || null
                color = figureData[1]
            }

            if (figureMap != this.figureMap){
                this.figureMap = figureMap
                this.color = color || 'f'
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
}

</style>