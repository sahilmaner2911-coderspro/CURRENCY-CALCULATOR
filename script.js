const apiURL = "https://open.er-api.com/v6/latest/USD";

let rates = {};

async function loadRates() {
    const response = await fetch(apiURL);
    const data = await response.json();
    rates = data.rates;

    populateCurrencies();
    showUSDInfo();
}

function populateCurrencies() {
    const currencies = [
        "USD", "INR", "EUR", "GBP", "JPY",
        "CNY", "CHF", "AED", "SAR", "SGD",
        "AUD", "CAD", "QAR", "KWD"
    ];

    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    currencies.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "INR";
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    const result = (amount / rates[from]) * rates[to];

    document.getElementById("result").innerText =
        `${amount} ${from} = ${result.toFixed(4)} ${to}`;
}

function showUSDInfo() {
    const usdToInr = rates["INR"];
    document.getElementById("usdRate").innerText =
        `1 USD = ${usdToInr} INR`;
}

document.getElementById("swapBtn").addEventListener("click", () => {
    const from = document.getElementById("fromCurrency");
    const to = document.getElementById("toCurrency");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;
});

loadRates();