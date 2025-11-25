export function formatCurrency(priceCents){
    return (priceCents/100).toFixed(2);
}

export default formatCurrency; // now we can import it without curly braces & each file can have only 1 default export