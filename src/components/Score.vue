<template>
    <text x="0" y="16" font-size="16">
        <tspan v-for="adder in players">
            {{adder.id}}: {{adder.num}}
        </tspan>
    </text>
</template>

<script>


export default {
    inject:['game'],
    data(){
        return {
            players:[],
        }
    },
    created(){

        this.game.on('tick', () => {
            this.players = this.game.adders.map(adder=>({
                id: adder.id,
                num: adder.chunks.length
            }))
        })
    }
}

</script>
