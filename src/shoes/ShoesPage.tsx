import { Fragment, useContext, useEffect, useState } from "react";
import Basket from "./Basket";
import Filter from "./Filter";
import { Order } from "./Order";
import { Shoe } from "./Shoe";
import { shoeAPI } from "./ShoeAPI";
import ShoeList from "./ShoeList";
import { ShopContext } from "./ShopContext";

function ShoesPage() {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    // const [basket, setBasket] = useState(new Array<Shoe>())
    const { basket, setBasket } = useContext(ShopContext);

    
    async function loadShoes(brand?: string) {
        setLoading(true);
        try {
            const data = await shoeAPI.get(brand);
            setError('');
            setShoes(data);
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function sendOrder(order: Order) {
        setLoading(true);
        try {
            await shoeAPI.post(order);
            setBasket(new Array())
            setError('');
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { 
        loadShoes();
    }, []);

    let current = "All"


    function changeFilter(brand: string) {
        current = brand
        if (brand == "All") {
            loadShoes();
        }
        else {
            loadShoes(brand)
        }
    }
    
    return (
        <Fragment>
            <div>

                <h1>Shoes</h1>
                <Filter brands={["All", "Adidas", "Nike", "Puma"]} current={current} handleChange={changeFilter} />
                {error && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <span className="icon-alert inverse "></span>
                                    {error}
                                </p>
                            </section>
                        </div>
                    </div>
                )}
                <ShoeList shoes={shoes} />
                {loading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )}
            </div>
            <Basket sendOrder={sendOrder}/>
        </Fragment>
    );
}

export default ShoesPage;