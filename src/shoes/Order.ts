import { Shoe } from "./Shoe";

export class OrderItem {
    Brand: string;
    Reference: string;
    Size: number;

    constructor(brand: string, reference: string, size: number) {
        this.Brand = brand;
        this.Reference = reference;
        this.Size = size;
    }
}

export class Order {
    ClientID: string;
    OrderID: string;
    ShippingInfo: string;
    Shoes: OrderItem[];

    constructor(clientId: string, orderId: string, shippingInfo: string, basketItems: {shoe: Shoe, size: number}[]) {
        this.ClientID = clientId;
        this.OrderID = orderId;
        this.ShippingInfo = shippingInfo;
        this.Shoes = basketItems.map((item) => (
            new OrderItem(item.shoe.brand, item.shoe.reference, item.size)
        ))
    }
}