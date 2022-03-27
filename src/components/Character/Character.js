import Spawn from "@unfocused/spawn";
import _ from '../../util/common';
import SUB_ZERO_SPRITE from '../../assets/sprites/subZero';

export default class Character {
  constructor(props = {}) {
    this.sprite = SUB_ZERO_SPRITE;
    this.characterState = 'stance';
    this.animateCharacter = this.animateCharacter.bind(this);
    this.el = this.render();
    this.animateCharacter();
    return this;
  }

  animateCharacter(step = 0) {
    setTimeout(() => {
      const { sprite, characterState } = this;
      const count = sprite[characterState].length;
      const nextStep = step + 1 >= count ? 0 : step + 1;
      this.el.innerHTML = sprite[characterState][step];
      this.animateCharacter(nextStep);
    }, 100);
  }

  render() {
    const { sprite, characterState } = this;
    return Spawn({
      className: 'character',
      children: el => el.innerHTML = sprite[characterState][0]
    });
  }
};