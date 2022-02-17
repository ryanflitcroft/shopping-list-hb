import { buyItem } from './services/fetch-utils';

export default function ListItem({ fetchItems, item }) {
  async function handleClick() {
    await buyItem(item.id);
    fetchItems();
  }

  return (
    <div className='list-item'
      onClick={
        !item.has_been_bought
          ? handleClick
          : () => {} }>
      <p className={
        item.has_been_bought
          ? 'bought'
          : 'needed'
      }>
        {item.name} - {item.quantity}
      </p>
    </div>
  );
}
