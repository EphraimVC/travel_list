import { useState } from "react";
import { Item } from "./Item";

//-------------------------------------------------------------------------------------
export function PackingList({
    newItems,
    deleteItems,
    toggleStatus,
    clearItems,
}) {
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
            .sort((a, b) => Number(b.packed) - Number(a.packed));

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
                <button onClick={clearItems}>Clear List</button>
            </div>
        </div>
    );
}
