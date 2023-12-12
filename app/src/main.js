import './style.css'
import { getEl, getUserLocation } from './modules/utils.js';
import { getList, setList, addNewItem } from './modules/localstorage-mods.js';

const { latitude, longitude } = getUserLocation();
const items = getList('items') || [];

const localTaps = document.createElement('div')
localTaps.innerHTML = `
<a target="_blank" href="https://www.google.com/maps/search/tapas/@${latitude},${longitude},11z/data=!3m1!4b1?entry=ttu"id="localTapas">Check out Tapas around you</a>
`;
getEl('.wrapper').append(localTaps);

const addItem = (e) => {
  e.preventDefault();

  const formObj = Object.fromEntries(new FormData(e.target));
  const text = formObj.item
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, getEl('.plates'));
  setList(items);

  e.target.reset();
}

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

const toggleDone = (e) => {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  setList(items);
  populateList(items, getEl('.plates'));
}


const main = () => {

  populateList(items, getEl('.plates'));
  getEl('#add-items').addEventListener('submit', addItem);
  getEl('.plates').addEventListener('click', toggleDone);

}

main();