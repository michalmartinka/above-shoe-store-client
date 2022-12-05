export class Shoe {
    reference: string;
    brand: string;
    price: number;
    sizes: number[];

    constructor(initializer: any) {
        this.reference = initializer.Reference;
        this.brand = initializer.Brand;
        this.price = +initializer.Price;
        this.sizes = initializer.Sizes;
    }
}