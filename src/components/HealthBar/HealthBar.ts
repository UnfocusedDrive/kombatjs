/**
 * HealthBar
 * Try to stay alive!
 */

// @ts-ignore
import Spawn, { Respawn } from "@unfocused/spawn";
import FullHealthSprite from '../../assets/sprites/healthBar/full';
import EmptyHealthSprite from '../../assets/sprites/healthBar/empty';

export default class HealthBar {
  el: HTMLElement;
  props: any;

  constructor(props = {} as HealthBar['props']) {
    const { health = 100 } = props;
    this.props = {
      health,
      maxHealth: health,
      style: {},
      ...props
    };
    this.el = this.render();

    return this;
  }

  getHealthPercent() {
    const { health, maxHealth } = this.props;

    return (health / maxHealth) * 100;
  }

  setProps(props: HealthBar['props']) {
    this.props = {
      ...this.props,
      ...props
    };

    this.el = Respawn(this.el, this.render());
  }

  render() {
    const { style } = this.props;
    return Spawn({
      style: {
        position: 'absolute',
        top: 0,
        width: 163,
        ...style
      },
      children: [
        Spawn({
          children: (el: HTMLElement) => el.innerHTML = EmptyHealthSprite,
          style: {
            position: 'absolute'
          }
        }),
        Spawn({
          children: (el: HTMLElement) => el.innerHTML = FullHealthSprite,
          style: {
            position: 'absolute',
            width: `${this.getHealthPercent()}%`,
            overflow: 'hidden'
          }
        })
      ]
    });
  }
}
