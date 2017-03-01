<template>
    
    <Board></Board>
</template>

<script>

import Board from './Board'

export default {
    name: 'app',
    components: {Board},
    created(){
    }
}

</script>

<style lang="less">
@import '../assets/common';

body,html{
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    background-color:@body-bg-color;
    overflow: hidden;
}
</style>