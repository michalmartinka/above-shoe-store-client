import { Order } from './Order';
import { Shoe } from './Shoe';
const baseUrl = 'https://sqv29c827h.execute-api.eu-central-1.amazonaws.com/prod';
const shoes_url = `${baseUrl}/shoes`;
const orders_url = `${baseUrl}/orders`;

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = 'There was an error retrieving the shoe(s). Please try again.';
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
}

function convertToShoeModels(data: any[]): Shoe[] {
    let projects: Shoe[] = data.map(convertToShoeModel);
    return projects;
}

function convertToShoeModel(item: any): Shoe {
    console.log(item)
    return new Shoe(item);
}

const shoeAPI = {
    get(brand?: string) {
        console.log("from get")
        console.log(brand)
        let gourl = shoes_url
        if (brand)
            gourl = `${shoes_url}?brand=${brand}`

        return fetch(gourl)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToShoeModels)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the shoes. Please try again.'
                );
            });
    },
    post(order: Order) {
        return fetch(`${orders_url}/`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error sending order. Please try again.'
                );
            });
    },
};

export { shoeAPI };