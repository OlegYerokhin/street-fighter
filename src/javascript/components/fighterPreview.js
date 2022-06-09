import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if(fighter) {
   
    const fighterImg = createFighterImage(fighter);
    const fighterName = createElement({ className: 'fighter-name' });
    const fighterInfo = createElement({
      tagName: 'div',
      className: 'fighter-info'
    });
    
    fighterInfo.innerHTML = `
    <div class="fighter-info">
      <p> Attack: ${fighter.attack}</p>
      <p> Defence: ${fighter.defense}</p>
      <p> Health: ${fighter.health}</p>
    </div>
  `;
  fighterName.innerText = fighter.name;


    fighterElement.append(fighterImg, fighterName, fighterInfo);
  } else {
   
  }
  // 
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
