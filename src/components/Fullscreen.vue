<template>
    <div class="fullscren" @click="toggle">
        [X]
    </div>
</template>

<script>

export default {
    methods:{
        toggle(){
            toggleFullscreen()
        }
    }
}

//Crossbrowser fullscreen toggle
function toggleFullscreen(elem) {
    elem = elem || document.documentElement
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
}
</script>

<style lang="less">
div.fullscren{
    position: absolute;
    top: 0;
    right:0;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    padding: 4px;
    font-family: sans-serif;
    background-color: fade(white,70);
    user-select:none;
}
</style>
