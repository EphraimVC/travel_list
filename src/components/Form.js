import { useState } from "react";

//--------------------------------------------------------------------------------
export function Form({ onAddItems }) {
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
            <button>Add ➕</button>
        </form>
    );
}
