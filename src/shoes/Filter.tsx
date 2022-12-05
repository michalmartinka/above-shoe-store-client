import { useState } from "react";

interface FilterProps {
    brands: string[];
    current: string;
    handleChange: (brand: string) => void;
}

function Filter(props: FilterProps) {
    const { brands, current, handleChange } = props;
    console.log("from filter")
    console.log(current)
    const [brand, setBrand] = useState<string>(current);


    return (
        <div><h4>Filter brands:</h4>
            <select id="brand" onChange={e => {
                handleChange(e.target.value);
            }}>
                {brands.map((brand) => (
                    <option value={brand} >{brand}</option>
                ))}

            </select>
        </div>
    );
}

export default Filter;