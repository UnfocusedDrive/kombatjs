/**
 * HealthBar
 * Try to stay alive!
 */

// @ts-ignore
import Spawn, { Respawn } from "@unfocused/spawn";

export default class HealthBar {
  el: HTMLElement;
  props: any;

  constructor(props = {}) {
    this.props = {
      health: 100,
      style: {},
      ...props
    };
    this.el = this.render();

    return this;
  }


  setProps(props: any) {
    this.props = {
      ...this.props,
      ...props
    };

    this.el = Respawn(this.el, this.render());
  }

  render() {
    const { health, style } = this.props;
    return Spawn({
      style: {
        position: 'absolute',
        top: 0,
        width: 200,
        height: 40,
        background: 'red',
        ...style
      },
      children: [
        Spawn({
          style: {
            width: `${health}%`,
            height: '100%',
            background: 'green'
          }
        })
      ]
    });
  }
}
