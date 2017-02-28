<template>
    <svg 
        :x="x + '%'" 
        :y="y + '%'" 
        :width="w + '%'" 
        :height="h + '%'"
    >
        <rect 
            v-if="type"
            v-for="r in drawMaps[type]"
            :x="( r[0] * 25 ) + '%'"
            :y="( r[1] * 25 ) + '%'"
        ></rect>
    </svg>
</template>

<script>

import * as drawMaps from './drawMaps'
export default {
    props:['x','y','w','h','type'],
    beforeCreate(){
        this.drawMaps = drawMaps
    }
}


</script>

<style lang="less">
@import 'common';

rect{
    fill:@front-color;
    width: 25%;
    height: 25%;
}

</style>