<template>
    <svg
        class="cell"
        :x="(data.x * data.w) + '%'" 
        :y="(data.y * data.h) + '%'" 
        :width="data.w + '%'" 
        :height="data.h + '%'"
    >
        <rect
            v-for="r in data.figureMap"
            :x="( r[0] * 25 ) + '%'"
            :y="( r[1] * 25 ) + '%'"
        ></rect>
    </svg>
</template>

<script>

export default {
    props:['data']
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