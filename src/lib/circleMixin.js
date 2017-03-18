
import * as tapDirectives from './tapDirectives'

export default {
    directives:tapDirectives,
    data(){
        return {
            size:80,
            center:{x:0,y:0},
            pos:{x:0,y:0},
            bounds:null,
            holding: false,
        }
    },
    computed:{
        translateCenter(){
            return `translate(${this.center.x},${this.center.y})`
        }
    },
    watch:{
        pos(){
            this.$emit('update',this.pos)
        }
    },
    mounted(){
        this.onResize()
        window.addEventListener('resize',this.onResize)
    },
    destroyed(){
        window.removeEventListener('resize',this.onResize)
    },
    methods:{
        onResize(){
            this.bounds = this.$el.getBoundingClientRect()
            this.resetCenter()
        },
        resetCenter(){
            this.center = {
                x: this.bounds.width/2,
                y: this.bounds.height/2
            }
            this.pos = {x:0,y:0}
            this.holding = false
        },
        setCenter(e){
            this.center = this.getXY(e)
            this.holding = true
        },
        moveStick(e){
            if (!this.holding)
                return
            let coords = this.getXY(e)
            this.pos = calcPos(coords,this.center,this.size)

            if (this.afterMoveStick)
                this.afterMoveStick()
        },
        getXY(e){
            return {
                x:e.pageX - this.bounds.left,
                y:e.pageY - this.bounds.top
            }
        }
    }
}

function calcPos(coords,center,size){
    let dX = (coords.x - center.x) / size
    let dY = (coords.y - center.y) / size

    //Distance to center
    let module = Math.sqrt( (dX*dX) + (dY*dY) )

    //Off limits
    if (module>1){

        //Angle
        let angle = Math.atan(dY/dX)

        //Intersect position
        let limX = Math.cos(angle)
        let limY = Math.sin(angle)

        if (dX<0 ){
            dX = -limX
            dY = -limY
        }else{
            dX = limX
            dY = limY
        }
    }

    return {x:dX,y:dY} 
}