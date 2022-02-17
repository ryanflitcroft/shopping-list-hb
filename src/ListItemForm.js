import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  const [listItem, setListItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    const item = {
      name: listItem,
      quantity,
      has_been_bought: false
    };

    await createListItem(item);
    await fetchItems();
    setListItem('');
    setQuantity(1);
  }

  return (
    <div className='new-item-form-container'>
      <form onSubmit={handleSubmit}>
          I need . . . 
        <label>
            Quantity
          <input onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            type="number" 
            name="quantity"
            required />
        </label>
        <label>
            Name
          <input onChange={(e) => setListItem(e.target.value)}
            value={listItem}
            name="name"
            required />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}