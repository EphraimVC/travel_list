import { useState } from "react";
import { Stats } from "./Stats";
import { PackingList } from "./PackingList";
import { Form } from "./Form";
import { Logo } from "./Logo";

function App() {
    const [items, setItems] = useState([]);

    function handleNewItems(item) {
        setItems((items) => [...items, item]);
    }

    function deleteItem(id) {
        // this filter method, creates a new array an saves all the items that are not equal to the item that is selected to be deleted,
        // and so the selected item is deleted
        setItems((items) => items.filter((item) => item.id !== id));
        console.log(id);
    }

    function handleToggle(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function clearList() {
        const confirm = window.confirm(
            "Are you sure you want to delete all items on your list ?"
        );
        if (confirm) setItems([]);
    }

    return (
        <div className="App">
            <Logo />
            <Form onAddItems={handleNewItems} />
            <PackingList
                newItems={items}
                deleteItems={deleteItem}
                toggleStatus={handleToggle}
                clearItems={clearList}
            />
            <Stats itemCount={items} />
        </div>
    );
}

export default App;
