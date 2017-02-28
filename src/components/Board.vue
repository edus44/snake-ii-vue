<template>
    <svg 
        class="board"
        :width="width"
        :height="height"
    >
        <template v-for="y in numRows">
            <template v-for="x in numCols">
                <Cell 
                    :x="( ( 100 / numCols ) * ( x - 1 ) )" 
                    :y="( ( 100 / numRows ) * ( y - 1 ) )"
                    :w="( 100 / numCols )"
                    :h="( 100 / numRows )"
                    :figure="seq[(x-1)+'-'+(y-1)]"
                ></Cell>
            </template>
        </template>
    </svg>
</template>

<script>

import Cell from './Cell'

export default {
    data(){
        return {
            numRows: 9,
            numCols: 20,
            width: 400,
            height: 180,
            seq:{
                '6-2':'FOOD',
                '4-2':'HEAD_MOUTH_RIGHT',
                '3-2':'BODY_RIGHT',
                '2-2':'BODY_FOOD_RIGHT',
                '1-2':'BODY_RIGHT',
                '0-2':'TAIL_RIGHT',
                '4-0':'TAIL_LEFT',
                '3-0':'BODY_LEFT',
                '2-0':'BODY_FOOD_LEFT',
                '1-0':'BODY_LEFT',
                '0-0':'HEAD_MOUTH_LEFT',
                '3-4':'HEAD_MOUTH_UP',
                '3-5':'BODY_UP',
                '3-6':'BODY_FOOD_UP',
                '3-7':'BODY_UP',
                '3-8':'TAIL_UP',
                '1-4':'TAIL_DOWN',
                '1-5':'BODY_DOWN',
                '1-6':'BODY_FOOD_DOWN',
                '1-7':'BODY_DOWN',
                '1-8':'HEAD_MOUTH_DOWN',

                '18-2':'HEAD_DOWN',
                '18-1':'BODY_DOWN',
                '18-0':'BODY_CORNER_RIGHT_DOWN',
                '17-0':'BODY_RIGHT',
                '16-0':'BODY_CORNER_UP_RIGHT',
                '16-1':'BODY_UP',
                '16-2':'BODY_UP',
                '16-3':'BODY_UP',
                '16-4':'BODY_CORNER_LEFT_UP',
                '17-4':'BODY_LEFT',
                '18-4':'BODY_CORNER_UP_LEFT',
                '18-5':'BODY_UP',
                '18-6':'BODY_UP',
                '18-7':'BODY_UP',
                '18-8':'BODY_CORNER_RIGHT_UP',
                '17-8':'BODY_RIGHT',
                '16-8':'BODY_CORNER_DOWN_RIGHT',
                '16-7':'BODY_DOWN',
                '16-6':'TAIL_DOWN',

                '12-2':'HEAD_DOWN',
                '12-1':'BODY_DOWN',
                '12-0':'BODY_FOOD_CORNER_RIGHT_DOWN',
                '11-0':'BODY_RIGHT',
                '10-0':'BODY_FOOD_CORNER_UP_RIGHT',
                '10-1':'BODY_UP',
                '10-2':'BODY_UP',
                '10-3':'BODY_UP',
                '10-4':'BODY_FOOD_CORNER_LEFT_UP',
                '11-4':'BODY_LEFT',
                '12-4':'BODY_FOOD_CORNER_UP_LEFT',
                '12-5':'BODY_UP',
                '12-6':'BODY_UP',
                '12-7':'BODY_UP',
                '12-8':'BODY_FOOD_CORNER_RIGHT_UP',
                '11-8':'BODY_RIGHT',
                '10-8':'BODY_FOOD_CORNER_DOWN_RIGHT',
                '10-7':'BODY_DOWN',
                '10-6':'TAIL_DOWN',
            }
        }
    },
    components: {Cell}
}

</script>

<style lang="less">
@import '../assets/common';
svg.board {
    background-color: @board-bg-color;
    display: block;
    margin:100px auto;
}
</style>