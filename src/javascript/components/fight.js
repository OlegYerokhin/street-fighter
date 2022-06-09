import { controls } from '../../constants/controls';
import { showModal } from './modal/modal';
import { showWinnerModal } from './modal/winner';

export async function fight(firstFighter, secondFighter) {
  setInitialState(firstFighter, secondFighter);

  return new Promise((resolve) => {
    const firstHealth = document.getElementById('left-fighter-indicator');
    const secondHealth = document.getElementById('right-fighter-indicator');

    firstFighter.currentHealth;

    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case controls.PlayerOneBlock:
          firstFighter.isBlock = true;
          break;
        case controls.PlayerTwoBlock:
          secondFighter.isBlock = true;
          break;
        default:
          if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
          }
          if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
          }
          break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.code) {
        case controls.PlayerOneAttack:
          attack(firstFighter, secondFighter, secondHealth, getDamage);
          break;
        case controls.PlayerOneBlock:
          firstFighter.isBlock = false;
          break;
        case controls.PlayerTwoAttack:
          attack(secondFighter, firstFighter, firstHealth, getDamage);
          break;
        case controls.PlayerTwoBlock:
          secondFighter.isBlock = false;
          break;
        default:
          if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
            attack(firstFighter, secondFighter, firstHealth, getDamage);
          }
          if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
            attack(secondFighter, firstFighter, firstHealth, getDamage);
          }
          break;
      }
    });
  });
}

function attack(attacker, defender, health, getDamage) {
  if (defender.currentHealth > 0) {
    if (!defender.isBlock) {
      defender.currentHealth -= getDamage(attacker, defender);
      health.style.width = defender.currentHealth >= 0 ? `${(defender.currentHealth / defender.health) * 100}%` : '0%';
      console.log(defender.currentHealth);
    } else {
      console.log('RESOLVED');
      resolve(attacker);
    }
  } else {
    showWinnerModal(attacker)
  }
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  return fighter.attack * (Math.random() * 2 + 1);
}

export function getBlockPower(fighter) {
  return fighter.defense * (Math.random() * 2 + 1);
}

export function getCriticalDamage(attacker) {
  return fighter.attack * 2;
}

function setInitialState(firstFighter, secondFighter) {
  const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
  const secondFighterHealthBar = document.getElementById('right-fighter-indicator');

  firstFighter.currentHealth = firstFighter.health;
  secondFighter.currentHealth = secondFighter.health;
}
