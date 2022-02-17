import { useState, useEffect } from 'react';
import { deleteAllItems, getListItems } from './services/fetch-utils';
import ListItemForm from './ListItemForm';
import ListItem from './ListItem';

export default function ListPage() {
  const [listItems, setShoppingList] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const data = await getListItems();
    setShoppingList(data);
  }

  async function handleDeleteClick() {
    await deleteAllItems();
    fetchItems();
  }

  return (
    <div className="list-page">
      <button onClick={handleDeleteClick}>New List</button>
      <ListItemForm fetchItems={fetchItems} />
      <div className='item-list'>
        {
          listItems.map((item, i) =>
            <ListItem key={item.name + i} item={item} fetchItems={fetchItems} />
          )
        }
      </div>
    </div>
  );
}