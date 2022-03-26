import Character from "./components/Character/Character";


/**
 * TODO:
 * Fix Undefined Bug
 * Add Health Bars
 * Create Dummy to test Hit box
 *
 *
 *
 *
 * KombatJS. Aka Mortal Kombat JS.
 *
 * Results:
 * ....
 *
 * Discovery:
 * ...
 */



const ARENA_SPRITE = {
  floor: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1068px" height="100px" viewBox="0 0 1068 100" enable-background="new 0 0 1068 100" xml:space="preserve">  <image id="image0" width="1068" height="100" x="0" y="0"
  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABCwAAABkCAMAAAB6iFGwAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABblBMVEVc//////97Y1qlnKUh
ISEYECGcjIxaSlJ7a2uEc3uUe3uchISMc2uMe3uUhIRSUlpSSkp7c3OEc2uMe3Oce2sxISFrUkop
ISFSQjljWmNrY2uMhISEe4QxISlCOTExMTFKSlJzc3trWlpza3O1paWclJSUjIxCKSlaSkpaWloY
EBBra2tzY2NSUlJKQkp7e3tCQkpaUlKtnJw5OUKljIRza2sQCAhrY1opISljWlJjY2sYGCFzc2s5
OTmMjIwQEBA5QkJKQjlSUkprY1JjWkpaSjljY1pjWlprY2NCQjlKQkI5MTFra2Nza1pSSkJKSkp7
c2OEc3OEhHOEe3uMjHt7e3NzY1KMhHOEe2uUjHuUlISEhHt7a1qEc2NjY2OclIycnJSMjISlnJyt
ra3Gvb2traWtpZytpaW1ra1za2OllJS9tbW1tbW1ta3OxsZaUkpKSkKEhIRzc3OcnJxja2MpKSlK
UlpaY2NCSkr///8iXBU0AAAAAnRSTlMAAHaTzTgAAAABYktHRAH/Ai3eAAAACXBIWXMAAAsTAAAL
EwEAmpwYAAAAB3RJTUUH5QcYFB8Km3Bv3QAAI6hJREFUeNrtfYt/2sa2ro8AIQlJIImnRiAkECAL
8RIqDwN2etLYu3WbZmOnbXKajfEDd9Mm2T337nP//LtG4MRJYzcvb/ucM5+xQDNLn5bMb32zZjQa
b2x8blChVwi/o/rfCAgI/lvic0tFJBSiX6tFKErEgoDgEj574/xOhF+HIHW95W36zrBcjOOZWIwT
RI6juTgRCwKC1/hXSEX0UnMNTXfkjopFQpJjIh/iOI7nFS7JcxwRCwKC1/gXaEUcGmlOFLhYjOGh
6WaZuykWqXQmm1MlKYc0FBMV2NJ0hogFAcEF/gViAS11klN4aKm5EC/GZClxB8Uiny2kwmG9aLAm
Q+dKZYu2yhXtrdzitr8sAoLbxI1LRYamoZFWxBhsc5Kk5rKZdOruiUU1X7Nzm7VaTYypyKnTgoFE
tVRSiVgQEKxx42LBaZWgmS7laMZkjaIeDqcK2fxdE4tUxrTlpELxJsO6QqOp1hItx1abRCwICNa4
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" />
</svg>`
};


const _ = {
  isDOM: value => value instanceof Element,
  isObject: value => typeof value === 'object',
  isStr: value => typeof value === 'string',
  camel2Kebab: string => string.split('').map(s => s === s.toUpperCase() ? `-${s.toLowerCase()}` : s).join('')
};

const Spawn = (props = {}) => {
  if (_.isStr(props)) {
    return document.createTextNode(props);
  }

  const { children, events = {}, mountEl, style = {}, tag = 'div' } = props;
  const el = document.createElement(tag);
  el.setAttribute('style', Object.keys(style).map(key => `${_.camel2Kebab(key)}: ${style[key]};`).join(' '));

  function appendChild(child) {
    // console.log('appendChild', child);

    if (_.isDOM(child)) {
      el.appendChild(child);
    } else if (_.isObject(child)) {
      if (child.innerHTML) {
        el.innerHTML = child.innerHTML;
      }
    } else if (_.isStr(child)) {
      el.appendChild(Spawn(child));
    } else {
      // el.innerHTML = child;
    }
  };

  // Append Children
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => appendChild(child));
    } else {
      appendChild(children);
    }
  }

  // Attach Event Listeners
  Object.keys(events).forEach(key => {
    el.addEventListener(key, events[key]);
  });

  // Mount to parent
  if (mountEl) {
    mountEl.append(el);
  }

  return el;
};

// Start App
// Stage
class App {
  constructor(props) {
    const { debug = false, mountEl }  = props;

    const container = Spawn({
      mountEl,
      style: {
        background: 'gray',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // width: '100%',
        // height: '100%'
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    });

    const track = Spawn({
      className: 'track',
      mountEl: container,
      children: {
        innerHTML: ARENA_SPRITE.floor
      },
      style: {
        background: 'gray',
        position: 'absolute',
        left: 0
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
        // onChange: (key, value) => this.handlePositionChange(1, key, value),
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
        mountEl,
        children: [
          Spawn({
            tag: 'button',
            children: 'Toggle Debug Mode',
            events: {
              click: () => {
                console.log('click');

                this.state.characters[0].setState({debug: false});
              }
            },
            // mountEl,
            style: {
              // position: 'absolute',
              // top: 20,
              // left: 20,
              // width: 20,
              // height: 20,
              // background: 'blue'
            }
          }),
          ...characters.map(character => Spawn({
            children: `${character.state.name} X Position: XXXX`
          }))
          // 'Player 1 X Position: XXXX'


        ],
        style: {
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'white'
        }
      });

    }



    console.log('Prepare for Kombat!');
    console.log('constructor', this);


    // this.state.characters[0].setState({debug: false});
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

const run = new App({
  mountEl: document.body,
  debug: true
});


// track.appendChild(character.el);
// track.appendChild(character2.el);