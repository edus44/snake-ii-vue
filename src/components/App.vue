<template>
    <section class="app">
        <div class="bar">
            {{cols}}x{{rows}}
            <label>cell</label><input v-model="cellSize" min="8" type="number" @input="handleResize">
            <label>speed</label><input v-model="speed" type="number" @input="handleResize">
            <button @click="setNumPlayers(1)">1P</button>
            <button @click="setNumPlayers(2)">2P</button>
            <button @click="fullscreen">Fullscreen</button>
        </div>
        <Controller v-if="numPlayers>1" class="p2" @update-dir="setAdderDir('p2',$event)"></Controller>
        <Board></Board>
        <Controller class="p1" @update-dir="setAdderDir('p1',$event)"></Controller>
    </section>
</template>

<script>

import Board from './Board'
import Controller from './Controller'
import toggleFullscreen from '../lib/fullScreen'

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
    components: {Board,Controller},
    data:()=>({
        cols:30,
        rows:15,
        cellSize:16,
        speed:180,
        numPlayers:1
    }),
    created(){
        window.addEventListener('resize',this.handleResize.bind(this))
        this.handleResize()

        this.syncSetup()
        this.resetPlayers()
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
        resetPlayers(){
            game.removeAdder('p1')
            game.removeAdder('p2')

            game.newAdder('p1')
            if (this.numPlayers>1){
                game.newAdder('p2')
            }
        },
        setNumPlayers(n){
            this.numPlayers=n
            this.resetPlayers()
            this.$nextTick(()=>
                this.handleResize()
            )
        },
        setAdderDir(player,dir){
            game.adderDir(player,dir)
        },
        handleResize(){
            if (this.cellSize<8) return

            let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            let rh = this.numPlayers == 1 ? 1.7 : 2.5;
            this.cols = (w / this.cellSize)|0
            this.rows = (h / rh / this.cellSize)|0
            this.syncSetup()
        },
        fullscreen(){
            toggleFullscreen()
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
    padding:6px;
    label{
        display: inline-block;
        font-size: 10px;
    }
    input{
        display: inline-block;
        font-size: 10px;
        width: 30px;
    }
    button{
        font-size: 10px;
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