/**
 * KombatJS. aka Mortal Kombat JS.
 */
import Spawn, { Mount } from "@unfocused/spawn";
import Character from "./components/Character/Character";
import _ from './util/common';
import ARENA_SPRITE from './assets/sprites/arena';

 export default class App {
   constructor(props) {
     const { debug = false, mountEl }  = props;

     const track = Spawn({
      className: 'track',
      mountEl: container,
      children: el => el.innerHTML = ARENA_SPRITE.floor,
      style: {
        background: 'gray',
        position: 'absolute',
        left: 0
      }
    });

     const container = Spawn({
       className: 'app',
       children: track,
       style: {
         background: 'gray',
         position: 'absolute',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         overflow: 'hidden',
         left: 0,
         top: 0,
         right: 0,
         bottom: 0
       }
     });

     const characters = [
       new Character({
         debug,
         onChange: (key, value, cb) => this.handlePositionChange(0, key, value, cb),
         mountEl: track,
         name: 'Player 1'
       }),
       new Character({
         mountEl: track,
         name: 'Player 2',
         debug,
         direction: 'left',
         keyBindings: {},
         position: 400
       })
     ];

     this.state = {
       arena: track,
       characters,
       debug
     }

     // Debug Mode
     // 1) Will show boxes, over characters
     // Each bug will show on the side, the height and width in px
     if (debug) {
       Spawn({
         parentEl: mountEl,
         children: [
           Spawn({
             tag: 'button',
             children: 'Toggle Debug Mode',
             events: {
               click: () => {
                 this.state.characters[0].setState({debug: false});
               }
             },
           }),
           ...characters.map(character => Spawn({
             children: `${character.state.name} X Position: XXXX`
           }))
         ],
         style: {
           position: 'absolute',
           top: 20,
           left: 20,
           background: 'white'
         }
       });

     }


     this.el = Mount(mountEl, container);



     return this;
   }

   handlePositionChange = (player, key, value, cb) => {
     const player1Bounds = this.state.characters[0].el.getBoundingClientRect();
     const player2Bounds = this.state.characters[1].el.getBoundingClientRect();
     const arenaBounds = this.state.arena.getBoundingClientRect();


     const bounds = this.state.characters[player].el.getBoundingClientRect();
     const right = value + bounds.width;
     const wall = this.state.characters[1].state.position;
     console.log('handlePositionChange', {
       player,
       key,
       value,
       cb,
       player1Bounds,
       player2Bounds,
       arenaBounds
     });

     if (right >= wall || value <= 0) {
       console.log('STOPPP');
     } else {
       cb(value);
     }
   }
 }
