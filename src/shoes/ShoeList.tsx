import { Shoe } from "./Shoe";
import ShoeItem from "./ShoeItem";

interface ShoeListProps {
    shoes: Shoe[];
}

function ShoeList({ shoes }: ShoeListProps) {
    return (
        <ul className="">
            {shoes.map((shoe) => (
                <ShoeItem shoe={shoe}></ShoeItem>
            ))}
        </ul>
    );
}

export default ShoeList;