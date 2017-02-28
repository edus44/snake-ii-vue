<template>
    <svg 
        class="board"
        :width="width"
        :height="height"
    >
        <template v-for="y in numRows">
            <template v-for="x in numCols">
                <Cell 
                    :x="( relWidth * ( x - 1 ) )" 
                    :y="( relHeight * ( y - 1 ) )"
                    :w="relWidth"
                    :h="relHeight"
                    :type="seq[(x-1)+'-'+(y-1)]"
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
                '10-2':'FOOD',
                '4-2':'HEAD_RIGHT',
                '3-2':'BODY_RIGHT',
                '2-2':'BODY_RIGHT',
                '1-2':'TAIL_RIGHT',
                '17-2':'TAIL_LEFT',
                '16-2':'BODY_LEFT',
                '15-2':'BODY_LEFT',
                '14-2':'HEAD_LEFT',
                '4-4':'HEAD_UP',
                '4-5':'BODY_UP',
                '4-6':'BODY_UP',
                '4-7':'TAIL_UP',
                '6-4':'TAIL_DOWN',
                '6-5':'BODY_DOWN',
                '6-6':'BODY_DOWN',
                '6-7':'HEAD_DOWN',
            }
        }
    },
    computed:{
        relWidth(){
            return 100 / this.numCols
        },
        relHeight(){
            return 100 / this.numRows
        }
    },
    components: {Cell}
}

</script>

<style lang="less">
@import 'common';
svg.board {
    background-color: @board-bg-color;
    display: block;
    margin:100px auto;
}
</style>