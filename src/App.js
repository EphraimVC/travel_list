import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
    return (
        <div className="App">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

export default App;

function Logo() {
    return <h1>😃 Far Away</h1>;
}
function Form() {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return; // this line make sure that if there is no input value then it cant create a new object with a null value

        const newObject = {
            // this objects gets and displays the new item of the list , and gives it this structure
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        setQuantity(1); // sets the quantity field back to the original value
        setDescription(""); // sets the description field back to the original value
        console.log(newObject);
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
function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item items={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
}
function Stats() {
    return (
        <footer className="stats">
            <em>
                You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
}
// ---------------------------- child components -------------------

function Item({ items }) {
    return (
        <li>
            <input type="checkbox" />
            <span
                style={items.packed ? { textDecoration: "line-through" } : {}}
            >
                {items.quantity}
                {items.description}
            </span>
            <button>❌</button>
        </li>
    );
}
