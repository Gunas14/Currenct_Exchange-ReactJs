
export const getHistory = (curr) => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+curr)
    .then(response => response.json())
    .then((historicalData) => {console.log(JSON.stringify(historicalData));
        return[{isInvalidCurrency : true},{historicalData : historicalData}]})
    .catch = () =>{ return[{ isInvalidCurrency : false}]}
}

