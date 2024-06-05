import { createOptimizedPicture, fetchPlaceholders} from '../../scripts/aem.js';

export default async function decorate(block) {
  let placeholders = {};
  try {
    placeholders = await fetchPlaceholders('');
  } catch (err) {
    console.error('Error fetching placeholders:', err);
  }
  const { fool } = placeholders;
  console.log("La valeur de la clé 'add more' est :", placeholders);
  console.log("La valeur de la clé 'add more' est :", placeholders.fool);
  /* change to ul, li */
  const ul = document.createElement('ul');
  const newDiv = document.createElement('p');
  newDiv.textContent =  placeholders.clickHereForMore;
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild){
      li.append(row.firstElementChild);
    }
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    li.append(newDiv);
    console.log("li :", li);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
