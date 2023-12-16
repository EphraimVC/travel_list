import { useState } from "react";

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
    return (
        <div className="App">
            <Logo />
            <Form onAddItems={handleNewItems} />
            <PackingList
                newItems={items}
                deleteItems={deleteItem}
                toggleStatus={handleToggle}
            />
            <Stats itemCount={items} />
        </div>
    );
}

export default App;
//--------------------------------------------------------------------------------
function Logo() {
    return <h1>😃 Far Away</h1>;
}
//--------------------------------------------------------------------------------
function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return; // this line make sure that if there is no input value then it cant create a new object with a null value

        const newItem = {
            // this objects gets and displays the new item of the list , and gives it this structure
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);

        setQuantity(1); // sets the quantity field back to the original value
        setDescription(""); // sets the description field back to the original value
        console.log(newItem);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 🛫 trip ? </h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
//-------------------------------------------------------------------------------------
function PackingList({ newItems, deleteItems, toggleStatus }) {
    const [sortBy, setSortby] = useState("input");
    let sortedItems;

    if (sortBy === "input") sortedItems = newItems;
    if (sortBy === "description")
        sortedItems = newItems
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed")
        sortedItems = newItems
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        items={item}
                        key={item.id}
                        deleteItem={deleteItems}
                        toggleStatus={toggleStatus}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortby(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">
                        Sort by alphabetic order
                    </option>
                    <option value="packed">Sort by packed items</option>
                </select>
            </div>
        </div>
    );
}

//-------------------------------------------------------------------------------------
function Stats({ itemCount }) {
    const amount = itemCount.length;
    const packedItems = itemCount.filter((item) => item.packed).length;

    return (
        <footer className="stats">
            <em>
                You have {amount} items on your list, and you already packed{" "}
                {packedItems}
            </em>
        </footer>
    );
}
// ---------------------------- child components -------------------

function Item({ items, deleteItem, toggleStatus }) {
    return (
        <li>
            <input
                type="checkbox"
                value={items.packed}
                onChange={() => toggleStatus(items.id)}
            />
            <span
                style={items.packed ? { textDecoration: "line-through" } : {}}
            >
                {items.quantity} {items.description}
            </span>
            <button onClick={() => deleteItem(items.id)}>❌</button>
        </li>
    );
}
