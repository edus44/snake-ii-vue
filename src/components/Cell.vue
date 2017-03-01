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
            figureMap: null
        }
    },
    created(){
        this.figureMaps = figureMaps
        bus.on('paintGrid',paintGrid=>{
            let figureId = paintGrid[this.id]
            let figureMap = figureMaps[figureId] || null
            if (figureMap != this.figureMap)
                this.figureMap = figureMap
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
}

</style>