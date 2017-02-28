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
            :x="( r[0] * 25 ) + '%'"
            :y="( r[1] * 25 ) + '%'"
        ></rect>
    </svg>
</template>

<script>

import * as figureMaps from '../lib/figureMaps'
export default {
    props:['x','y','w','h','figure'],
    created(){
        this.figureMaps = figureMaps
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