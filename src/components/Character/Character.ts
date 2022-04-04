import Spawn from "@unfocused/spawn";
import _ from '../../util/common';
import SUB_ZERO_SPRITE from '../../assets/sprites/subZero';

export enum FrameStates {
  stance = 'stance'
}

interface CharacterProps {
  characterState: FrameStates
}

export default class Character {
  constructor(props = {}) {
    this.props = {
      characterState: FrameStates.stance
    } as CharacterProps;
    this.sprite = SUB_ZERO_SPRITE;
    this.animateCharacter = this.animateCharacter.bind(this);
    this.el = this.render();
    this.animateCharacter();
    return this;
  }

  animateCharacter(prevStep = 0) {
    setTimeout(() => {
      const { characterState } = this.props;
      const { sprite } = this;
      const frames = sprite[characterState];
      const count = frames.length;
      const { step, nextStep } = this.getSteps(prevStep, count, frames);

      this.el.innerHTML = frames[step];
      this.animateCharacter(nextStep);
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

  setProps(props) {
    this.props = {
      ...this.props,
      ...props
    };
  }

  render() {
    const { characterState } = this.props;
    const { sprite } = this;
    return Spawn({
      className: 'character',
      children: el => el.innerHTML = sprite[characterState][0]
    });
  }
};