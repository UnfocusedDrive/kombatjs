import Spawn, { Mount, Respawn } from "@unfocused/spawn";
import _ from '../../util/common';
import SUB_ZERO_SPRITE from '../../assets/sprites/subZero';

export default class CharacterOld {
  constructor(props = {}) {
    const {
      debug = false,
      direction = 'right',
      keyBindings = {
        moveRight: 'ArrowRight',
        moveLeft: 'ArrowLeft',
        punch: ' '
      },
      mountEl,
      name = 'Default Player',
      position = 100
    } = props;

    // dont need?
    this.props = props;
    this.state = {
      debug,
      direction,
      keyBindings,
      isMoving: false,
      sprite: SUB_ZERO_SPRITE.stance,
      position,
      mountEl,
      move: null,
      name
    };

    this.render('mount');
    this.updateDirection(this.state.direction);
    this.attachEvents();
    return this;
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state
    };
    this.render();
  }

  render(lifecycle) {
    const { debug, mountEl } = this.state;
    let debugStyle = {};
    if (debug) {
      debugStyle = {
        background: 'rgba(0,0,0, 0.3)',
        border: '1px solid red'
      };
    }

    const props = {
      style: {
        position: 'absolute',
        bottom: 20,
        left: this.state.position,
        ...debugStyle
      }
    };

    if (lifecycle === 'mount') {
      this.el = Mount(mountEl, (Spawn(props)));
    } else {
      this.el = Respawn(this.el, Spawn(props));
    }

    // ifx this on update... lifecycle
    this.animate();
  }

  attachEvents() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  updateSpriteSet(value) {
    let sprite;
    switch (value) {
      case 'walk':
        sprite = SUB_ZERO_SPRITE.walk;
        break;
      case 'punch':
        sprite = SUB_ZERO_SPRITE.punch;
        break;
      case 'stance':
      default:
        sprite = SUB_ZERO_SPRITE.stance;
    }

    // assign
    this.state.sprite = sprite;
    // replace 1st frame
    // this.el.innerHTML = this.state.sprite[0];
    // this.updateElFrame(this.state.sprite[0]);
  }

  updateElFrame(frame) {
    this.el.innerHTML = frame;
  }

  animate = (count = 0) => {
    let position = count % this.state.sprite.length;
``
    // replace sprite frame every n seconds
    setTimeout(() => {
      // if frame set is swapped during timeout then reset to 0
      if (!this.state.sprite[position]) {
        position = 0;
      }

      this.updateElFrame(this.state.sprite[position||0]);
      this.animate(count + 1);
    }, 100);
  }

  updateDirection(direction) {

    let transform = '';
    if (direction === 'right') {
      transform = '';
    } else {
      transform = 'scaleX(-1)';
    }

    this.state.move = direction;
    this.el.style.transform = transform;
  }





  handleKeyDown = (e) => {
    const keyPress = e.key;

    const { moveLeft, moveRight, punch } = this.state.keyBindings;




    let action;
    let direction;
    let transform;
    switch (keyPress) {
      // Move Right
      case moveRight:
        direction = 'right';
        transform = '';
        action = 'move';
        break;
      // Move Left
      case moveLeft:
        direction = 'left';
        transform = 'scaleX(-1)';
        action = 'move';
        break;
      // Punch
      case punch:
        direction = '';
        transform = '';
        action = 'punch';
        break;
      default:
        direction = null;
        transform = '';
    }



    if (action === 'move') {
      this.updateDirection(direction);

      if (!this.state.isMoving) {
        this.state.isMoving = true;
        this.updateSpriteSet('walk');
        this.move();
      }
    }

    if (action === 'punch') {
      this.updateSpriteSet('punch');
    }
  }

  handleKeyUp = (e) => {
    this.state.isMoving = false;
    this.state.direction = null;
    this.updateSpriteSet('stance');
  }

  setPosition = (position) => {
    this.state.position = position;
    this.el.style.left = position;
  }

  move = (e) => {
    const inc = 1;
    let position = this.state.position;

    if (this.state.isMoving && this.state.move) {
      if (this.state.move === 'right') {
        position += inc;
      } else if (this.state.move === 'left') {
        position -= inc;
      }

      if (this.props.onChange) {
        this.props.onChange('position', position, this.setPosition);
      } else {
        this.setPosition(position)
      }
      // this.el.style.left = this.state.position;
      setTimeout(this.move, 10);
    }
  }
};