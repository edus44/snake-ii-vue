<template>
    <section class="app">
        <!-- <div class="bar">
            <label>cols</label><input v-model="cols" type="number" @input="syncSetup">
            <label>rows</label><input v-model="rows" type="number" @input="syncSetup">
            <label>cellSize</label><input v-model="cellSize" type="number" @input="syncSetup">
            <label>speed</label><input v-model="speed" type="number" @input="syncSetup">
        </div> -->
        <FullScreen></FullScreen>
        <Controller class="p2" @update-dir="setAdderDir('p2',$event)"></Controller>
        <Board></Board>
        <Controller class="p1" @update-dir="setAdderDir('p1',$event)"></Controller>
    </section>
</template>

<script>

import Board from './Board'
import Controller from './Controller'
import FullScreen from './FullScreen'

import Game from '../classes/Game'
let game = window.game = new Game()

// import dp from '../lib/dp'
// dp.on('player-connected',(username)=>{
//     game.newAdder(username)
// })
// dp.on('player-disconnected',(username)=>{
//     game.removeAdder(username)
// })
// dp.on('player-dir',(data)=>{
//     game.adderDir(data.id,data.dir)
// })

window.document.addEventListener('keydown',e=>{
    game.keyPressed(e.keyCode)
})

export default {
    name: 'app',
    provide:{game},
    components: {Board,Controller,FullScreen},
    data:()=>({
        cols:30,
        rows:15,
        cellSize:16,
        speed:150 
    }),
    created(){
        this.syncSetup()
        game.newAdder('p1')
        game.newAdder('p2')
        game.start()
    },
    methods:{
        syncSetup(){
            game.setup({
                cols:this.cols,
                rows:this.rows,
                cellSize:this.cellSize,
                speed:this.speed
            })
        },
        setAdderDir(player,dir){
            game.adderDir(player,dir)
        }
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
body{
    display: flex;
}
.bar{
    padding:10px;
    label{
        display: inline-block;
        font-size: 12px;
        margin-right: 6px;
    }
    input{
        display: inline-block;
        margin-right: 10px;
        width: 50px;
    }
}

section.app{
    display: flex;
    flex:1;
    flex-direction:column;

    .board{
    }
    .touch-control-simple{
        background-color: black;
        flex:1;
        &.p1{
            background-color: darken(@adder-1-color,20);
        }
        &.p2{
            background-color: darken(@adder-2-color,20);
        }
    }
}
</style>