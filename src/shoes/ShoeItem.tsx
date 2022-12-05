import { useContext } from "react";
import { OrderItem } from "./Order";
import { Shoe } from "./Shoe";
import { ShopContext } from "./ShopContext";

interface ShoeItemProps {
    shoe: Shoe;
}

function ShoeItem(props: ShoeItemProps) {
    const { shoe } = props;

    let { basket, setBasket } = useContext(ShopContext)

    const handleAddClick = (shoeAdded: Shoe, size: number) => {
        let newBasket = Array.from(basket);
        newBasket.push({shoe: shoeAdded, size: size})
        setBasket(newBasket);
    };

    let selectedSize = shoe.sizes[0]
    const handleChange = (size: string) => {
        selectedSize = +size
    };
    return (
        <li key={shoe.brand + shoe.reference}>
            <b>{shoe.brand} {shoe.reference} </b>
            {/* Sizes: {shoe.sizes.join(", ")} */}
            
            <select id="{shoe.brand + shoe.reference + 'size'}" onChange={e => {
                handleChange(e.target.value);
            }}>
                {shoe.sizes.map((size) => (
                    <option value={size} >{size}</option>
                ))}

            </select>
            {<button className=" bordered"
                onClick={() => {
                    handleAddClick(shoe, selectedSize);
                }}>
                <span className=""></span>
                Add to cart
            </button>}
        </li>
    );
}

export default ShoeItem;