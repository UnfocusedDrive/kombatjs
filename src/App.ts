/**
 * KombatJS. aka Mortal Kombat JS.
 */
// @ts-ignore
import Spawn, { Mount } from "@unfocused/spawn";
import HealthBar from "./components/HealthBar/HealthBar";
import Character, { CharacterProps, FrameStates } from "./components/Character/Character";
import CharacterOld from "./components/Character/Character_old";
import _ from './util/common.ts';
import ARENA_SPRITE from './assets/sprites/arena';

export default class App {
  el: HTMLElement;
  characters: any[];
  state: any;
  trackEl: HTMLElement;
  props: any;

  constructor(props = {}) {
     const { debug = false, mountEl } = props;
     this.props = {
      ...props,
      debug,
      mountEl
     };
     this.state = {
       moving: false
     };

     this.handleKeyDown = this.handleKeyDown.bind(this);
     this.handleKeyUp = this.handleKeyUp.bind(this);


     this.healthBars = [
      new HealthBar({
        style: {
          left: 0
        }
      }),
       new HealthBar({
         style: {
           right: 0
         }
       })
     ];

     this.characters = [
      new Character({
        debug,
        onChange: (key, value, cb) => this.handlePositionChange(0, key, value, cb),
        name: 'Player 1',
        style: {
          position: 'absolute',
          left: 78,
          top: -62
        }
      }),
      new Character({
        name: 'Player 2',
        debug,
        direction: 'w',
        keyBindings: {},
        position: 400,
        style: {
          position: 'absolute',
          left: 478,
          top: -62
        }
      })
    ];
     this.trackEl = this.renderTrack();
     const container = this.render();

     this.el = Mount(mountEl, container);
     this.attachEvents();
     return this;
  }

  attachEvents() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(e: any) {
    const { key } = e;

    switch(key) {
      case 'ArrowRight':
        if (!this.state.moving) {
          this.setState({ moving: 'e' });
          this.characters[0].setProps({
            moving: this.state.moving,
            characterState: FrameStates.walk,
            direction: 'e'
          });
          this.moveCharacter();
        }
        break;
      case 'ArrowLeft':
        if (!this.state.moving) {
          this.setState({ moving: 'w' });
          this.characters[0].setProps({
            moving: this.state.moving,
            characterState: FrameStates.walk,
            direction: 'w'
          });
          this.moveCharacter();
        }
        break;
      case ' ':
        if (!this.state.action) {
          this.setState({
            action: 'punch'
          });

          this.characters[0].setProps({
            characterState: FrameStates.punch
          });
          this.punchCharacter();
        }
    }
  }

  handleKeyUp() {
    this.setState({
      action: null,
       moving: null
    });
    this.characters[0].setProps({
      moving: this.state.moving,
      characterState: FrameStates.stance
    });
  }

  getDistance() {
    const [player1, player2] = this.characters;

    return Math.abs(this.getLeft(player1.el) - this.getLeft(player2.el));

  }

  getLeft(el) {
    return parseInt(el.style.left, 10);
  }

  isInRange() {
    return this.getDistance() <= 90;
  }

  getNextLeft(el: HTMLElement, direction: CharacterProps['direction']): string {
    const inc = 1;
    // const num = parseInt(el.style.left, 10);
    const num = this.getLeft(el);
    let value;

    if (direction === 'e') {
      value = num + inc;
    } else {
      value = num - inc;
    }

    return `${value}px`;
  }


  punchCharacter() {
    if (this.state.action === 'punch') {
      if (this.isInRange()) {
        const nextHealth = Math.max(0, this.characters[1].props.health - 1);
        this.characters[1].setProps({
          health: nextHealth
        });
        this.healthBars[1].setProps({
          health: nextHealth
        });
      }

      setTimeout(() => {
        this.punchCharacter();
      }, 10);
    }
  }

  moveCharacter() {
    if (this.state.moving) {
      const character = this.characters[0];
      const { direction } = character.props;
      character.el.style.left = this.getNextLeft(character.el, direction);

      setTimeout(() => {
        this.moveCharacter();
      }, 10);
    }

  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state
    }
  }

  handlePositionChange = (player, key, value, cb) => {
     const player1Bounds = this.state.characters[0].el.getBoundingClientRect();
     const player2Bounds = this.state.characters[1].el.getBoundingClientRect();
     const arenaBounds = this.state.arena.getBoundingClientRect();


     const bounds = this.state.characters[player].el.getBoundingClientRect();
     const right = value + bounds.width;
     const wall = this.state.characters[1].state.position;


     if (right >= wall || value <= 0) {
      /// something....
    } else {
       cb(value);
     }
  }

  renderTrack() {
    return Spawn({
      className: 'track',
      children: el => {
        el.innerHTML = ARENA_SPRITE.floor;
        this.characters.forEach(character => el.appendChild(character.el))
      },
      style: {
        background: 'gray',
        position: 'absolute',
        left: 0
      }
    });
  }

  render() {
    return Spawn({
      className: 'app',
      children: [
        ...this.healthBars.map(bar => bar.el),
        this.trackEl
      ],
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
  }
}
