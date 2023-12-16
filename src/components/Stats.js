//-------------------------------------------------------------------------------------
export function Stats({ itemCount }) {
    if (!itemCount.length)
        return (
            <p className="stats">Start Adding items to your packing list 😁</p>
        );
    const amount = itemCount.length;
    const packedItems = itemCount.filter((item) => item.packed).length;

    return (
        <footer className="stats">
            <em>
                {amount === packedItems
                    ? "All packed!😃 Lets GO !!! 🛫 "
                    : ` You have  -  ${amount} item${
                          amount > 1 ? "s" : ""
                      } on your list - ${packedItems} PACKED item${
                          packedItems > 1 ? "s" : ""
                      } - ${amount - packedItems} item${
                          amount - packedItems > 1 ? "s" : ""
                      } LEFT to pack`}
            </em>
        </footer>
    );
}
