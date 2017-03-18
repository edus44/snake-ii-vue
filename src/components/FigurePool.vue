<template>
    <defs>
        <svg
            v-for="map,figure in figureMaps"
            :id="figure"
            :width="w + '%'" 
            :height="h + '%'"
            class="figure"
        >
            <rect
                v-for="r in map"
                :x="( r[0] * 25 ) + '%'"
                :y="( r[1] * 25 ) + '%'"
                width="25%"
                height="25%"
            ></rect>
        </svg>
    </defs>
</template>

<script>
import figureMaps from '../constants/figureMaps'

export default {
    props:['w','h'],
    created(){
        this.figureMaps = figureMaps
    }
}


</script>

<style lang="less">
@import '../assets/common';

svg.figure{
    rect{
        stroke-width:2%;
    }
}

use.cell{
    fill:@front-color;
    stroke:@board-bg-color;
    &.c-p1{
        fill:@adder-1-color;
    }
    &.c-p2{
        fill:@adder-2-color;
    }
    &.c-p3{
        fill:@adder-3-color;
    }
    &.c-p4{
        fill:@adder-4-color;
    }
    &.s-locked{
        stroke:white;
        fill-opacity:.8;
    }
}

</style>