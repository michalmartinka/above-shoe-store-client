import { useContext, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Order } from "./Order";
import { Shoe } from "./Shoe";
import { ShopContext } from "./ShopContext";

interface BasketProps {
    sendOrder: (order: Order) => void;
}

function Basket({ sendOrder }: BasketProps) {
    const { basket, setBasket } = useContext(ShopContext);
    const [checkout, setCheckout] = useState(false);

    const total = basket.reduce((accumulator, item) => {
        return accumulator + item.shoe.price;
    }, 0);
    const handleCheckoutClick = (basket: {shoe: Shoe, size: number}[]) => {
        setCheckout(true)
    };

    const prepareAndSendOrder = (shipping: string) => {
        console.log('Sending order to: ', shipping);
        const orderId = Math.random().toString(36).substring(2,7);
        const clientId = Math.random().toString(36).substring(2,7);

        let order = new Order(clientId, orderId, shipping, basket)
        sendOrder(order)
    };
    return (
        <div>
            <h1>Basket</h1>

            <ul>

                {basket.map((basketItem) => (
                    <li>{basketItem.shoe.brand} {basketItem.shoe.reference}</li>
                ))}

            </ul>
            <b>Total: {total}</b>
            {
                basket.length > 0 ? (
                    <button className=" bordered"
                        onClick={() => {
                            handleCheckoutClick(basket);
                        }}>
                        <span className="">Checkout</span>
                    </button>
                ) : (<></>)
            }

            {checkout && basket.length > 0 ? (<CheckoutForm onSend={prepareAndSendOrder} />) : (<></>)}
        </div>
    );
}

export default Basket;
