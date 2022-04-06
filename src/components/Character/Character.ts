// @ts-ignore
import Spawn from "@unfocused/spawn";
import _ from '../../util/common';
import SUB_ZERO_SPRITE from '../../assets/sprites/subZero';

export enum FrameStates {
  hit = 'hit',
  stance = 'stance',
  walk = 'walk',
  punch = 'punch'
}

export interface CharacterProps {
  characterState: FrameStates,
  direction: 'e' | 'w',
  style: any
}

export default class Character {
  el: HTMLElement;
  props: CharacterProps;
  sprite: any;

  constructor(props = {}) {
    this.props = {
      direction: 'e',
      characterState: FrameStates.stance,
      health: 100,
      ...props
    } as CharacterProps;
    this.sprite = SUB_ZERO_SPRITE;
    this.animateCharacter = this.animateCharacter.bind(this);
    this.el = this.render();
    this.animateCharacter();
    return this;
  }

  animateCharacter() {
    let prevStep = 0;

    setInterval(() => {
      const { characterState } = this.props;
      const { sprite } = this;
      const frames = sprite[characterState];
      const count = frames.length;
      const { step, nextStep } = this.getSteps(prevStep, count, frames);
      this.el.innerHTML = frames[step];
      prevStep = nextStep;
    }, 100);
  }

  /**
   * Get next frame step
   * Note: The frame must also exist, otherwise start again from 0
   * @param {*} step
   * @param {*} count
   * @param {*} frames
   * @returns
   */
  getSteps(step, count, frames) {
    if (!frames[step]) {
      return {
        step: 0,
        nextStep: 1
      }
    }

    return {
      step,
      nextStep: step + 1 >= count ? 0 : step + 1
    }
  }

  setProps(props: CharacterProps) {
    this.props = {
      ...this.props,
      ...props
    };

    this.updateDirection();
  }

  getTransform() {
    const { direction } = this.props;
    let transform;
    if (direction === 'e') {
      transform = 'scaleX(1)';
    } else {
      transform = 'scaleX(-1)';
    }

    return transform;
  }

  updateDirection() {
    this.el.style.transform = this.getTransform();
  }

  render() {
    const { characterState, style } = this.props;
    const { sprite } = this;
    return Spawn({
      className: 'character',
      children: (el: HTMLElement) => el.innerHTML = sprite[characterState][0],
      style: {
        display: 'inline-block',
        transform: this.getTransform(),
        ...style
      }
    });
  }
};