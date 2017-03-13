
import deepstream from 'deepstream.io-client-js'
import EventEmitter from 'eventemitter3'
import * as KEY from './keyCodes'

let client = deepstream('localhost:6020').login()
let bus = new EventEmitter()

client.event.subscribe('session:1:player-dir', function(data){
    bus.emit('player-dir',data)
})

client.presence.subscribe((username, isLoggedIn) => {
    if (isLoggedIn){
        bus.emit('player-connected',username)
    }else{
        bus.emit('player-disconnected',username)
    }
})

client.presence.getAll(players=>{
    for(let i in players)
        bus.emit('player-connected',players[i])
})

export default bus