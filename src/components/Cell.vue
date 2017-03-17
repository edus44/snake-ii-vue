<template>
    <use 
        v-if="figure"
        :xlink:href="'#'+figure" 
        :class="`cell c-${color} s-${status}`"
        :x="x + '%'" 
        :y="y + '%'" 
    ></use>
</template>

<script>

export default {
    inject:['game'],
    props:['x','y','id'],
    data(){
        return {
            figure: null,
            color: null,
            status: null,
        }
    },
    created(){
        this.game.on('tick',paintGrid=>{
            let figureData = paintGrid[this.id]
            let figure,color,status

            if (figureData){
                figureData = figureData.split('@')
                figure = figureData[0]
                color = figureData[1] 
                status = figureData[2] 
            }

            if (figure != this.figure || status != this.status){
                this.figure = figure || null
                this.color = color || 'f'
                this.status = status || 'def'
            }
        })
    }
}


</script>