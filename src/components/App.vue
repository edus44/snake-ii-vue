<template>
    <Board></Board>
</template>

<script>

import Board from './Board'

import Game from '../lib/Game'
import dp from '../lib/dp'
let game = window.game = new Game()

dp.on('player-connected',(username)=>{
    game.newAdder(username)
})
dp.on('player-disconnected',(username)=>{
    game.removeAdder(username)
})
dp.on('player-dir',(data)=>{
    game.adderDir(data.id,data.dir)
})

window.document.addEventListener('keydown',e=>{
    game.keyPressed(e.keyCode)
})

export default {
    name: 'app',
    provide:{game,dp},
    components: {Board},
    created(){
        game.setup({
            cols:30,
            rows:15,
            cellSize:16,
            speed:150
        })
        game.newAdder('p1')
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