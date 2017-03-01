
import deepstream from 'deepstream.io-client-js'
import EventEmitter from 'eventemitter3'
import * as KEY from './keyCodes'

let client = deepstream('localhost:6020').login()
let record = client.record.getRecord('positions')
let emitter = new EventEmitter()

record.subscribe('player1', (pos) => {
    let key = 0
    if (pos.x==1)       key = KEY.P1_RIGHT 
    else if (pos.x==-1) key = KEY.P1_LEFT 
    else if (pos.y==1)  key = KEY.P1_DOWN 
    else if (pos.y==-1) key = KEY.P1_UP 
    if (key)
        emitter.emit('keyPressed',key)
})
record.subscribe('player2', (pos) => {
    let key = 0
    if (pos.x==1)       key = KEY.P2_RIGHT 
    else if (pos.x==-1) key = KEY.P2_LEFT 
    else if (pos.y==1)  key = KEY.P2_DOWN 
    else if (pos.y==-1) key = KEY.P2_UP 
    if (key)
        emitter.emit('keyPressed',key)
})

export default emitter