// ---------------------------- child components -------------------
export function Item({ items, deleteItem, toggleStatus }) {
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
