
const isTouch = 'ontouchstart' in window

function tapFactory(mouse,touch){
    return {
        bind(el,{value}){
            let evName = isTouch ? touch : mouse
            let fn = value

            //Shims touch event pageX/Y
            if (isTouch){
                fn = (e)=>{
                    e.pageX = e.targetTouches.length ? e.targetTouches[e.targetTouches.length-1].pageX : 0
                    e.pageY = e.targetTouches.length ? e.targetTouches[e.targetTouches.length-1].pageY : 0
                    value(e)
                }
            }

            //Save binded fn to remove later
            if (!el._tapFns)
                el._tapFns = {}
            el._tapFns[evName] = fn

            //Attach listener
            el.addEventListener(evName,el._tapFns[evName])
        },
        unbind(el){
            let evName = isTouch ? touch : mouse
            el.removeEventListener(evName,el._tapFns[evName])
        }
    }
}

export const tapstart = tapFactory('mousedown','touchstart')
export const tapmove = tapFactory('mousemove','touchmove')
export const tapend = tapFactory('mouseup','touchend')
