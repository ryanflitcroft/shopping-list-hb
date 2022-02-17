import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  // you'll need to track the name and quantity in state
  const [listItem, setListItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    const item = {
      name: listItem,
      quantity,
      has_been_bought: false
    };
    // make a new list item in supabase using the form values stored in state
    createListItem(item);
    // refetch the items using the handler function passed down as a prop
    fetchItems();
    setListItem('');
    setQuantity(1);
    // clear the name and quantity in state to refresh the form

  }

  return (
    <div className='new-item-form-container'>
      {/* on submit, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
          I need . . . 
        <label>
            Quantity
          {/* on change, update the quantity in state */}
          <input onChange={(e) => setQuantity(e.target.value)}
            // this should be a controlled input, so set the value based on state
            value={quantity}
            type="number" 
            name="quantity"
            required />
        </label>
        <label>
            Name
          {/* on change, update the name in state */}
          <input onChange={(e) => setListItem(e.target.value)}
            // this should be a controlled input, so set the value based on state 
            value={listItem}
            name="name"
            required />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
