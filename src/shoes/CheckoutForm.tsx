import React, { SyntheticEvent, useState } from "react";

interface CheckoutFormProps {
    onSend: (shippingInfo: string) => void;
}

function CheckoutForm({ onSend }: CheckoutFormProps) {
    const [shipping, setShipping] = useState("");

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!shipping) {
            alert('Shipping is required')
            return;
        }
        onSend(shipping);
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        setShipping(value)
    };
    return (
        <form onSubmit={handleSubmit} className="input-group vertical">
            <label htmlFor="shippingInfo">Shipping info</label>
            <textarea name="shippingInfo" placeholder="Enter shipping info"
                value={shipping} onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium">Send order</button>
                <span />

            </div>
        </form>
    );
}

export default CheckoutForm;