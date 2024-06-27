"use strict";

const form = document.querySelector(".converter__form");
const selectBaseCurrency = document.querySelector("#base-currency");
const selectQuoteCurrency = document.querySelector("#quote-currency");
const inputBaseCurrency = document.querySelector("#input-base-currency");
const inputQuoteCurrency = document.querySelector("#input-quote-currency");
const rateText = document.querySelector("#rate");

// currency list
const currencies = [
  "EUR",
  "AED",
  "AFN",
  "XCD",
  "ALL",
  "AMD",
  "AOA",
  "ARS",
  "USD",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "XOF",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "NOK",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "XAF",
  "CHF",
  "NZD",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "ANG",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "MAD",
  "ERN",
  "ETB",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRO",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "XPF",
  "NGN",
  "NIO",
  "NPR",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STD",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "UYU",
  "UZS",
  "VEF",
  "VND",
  "VUV",
  "WST",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
  "MRU",
  "STN",
];

let exchangeRate, today, selectedBaseCurr;

// outline selection with red
function renderWarning(val) {
  if (val) {
    if (selectBaseCurrency.value === "0") {
      selectBaseCurrency.style.borderColor = "var(--clr-red)";
    }

    if (selectQuoteCurrency.value === "0") {
      selectQuoteCurrency.style.borderColor = "var(--clr-red)";
    }
  } else {
    selectBaseCurrency.style.borderColor = "var(--clr-gray-2)";

    selectQuoteCurrency.style.borderColor = "var(--clr-gray-2)";
  }
}

// create options to select
function createOptions() {
  let htmlEl;
  currencies.forEach((currency) => {
    htmlEl = `<option value="${currency.toLowerCase()}">${currency}</option>`;

    selectBaseCurrency.insertAdjacentHTML("beforeend", htmlEl);

    selectQuoteCurrency.insertAdjacentHTML("beforeend", htmlEl);
  });
}

// Fetch API to get exchange rate
function getExchangeRate(currCode) {
  exchangeRate = "";
  fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currCode}.json`
  )
    .then((response) => response.json())
    .then((result) => {
      exchangeRate = result[currCode];
      today = result.date;
      selectedBaseCurr = currCode;
      renderExchangeRate();
    });
}

// Render exchange rate
function renderExchangeRate() {
  const [baseCurr, quoteCurr] = getSelections();

  if (baseCurr !== "0" && quoteCurr !== "0")
    rateText.textContent = exchangeRate[quoteCurr].toFixed(4);
}

// Get selection values. Returns: an array [baseCurr, quoteCurr]
function getSelections() {
  return [selectBaseCurrency.value, selectQuoteCurrency.value];
}

// Get currency inputs Returns: an array [baseCurrIn, quoteCurrIn]
function getInputs() {
  return [+inputBaseCurrency.value, +inputQuoteCurrency.value];
}

// check if selections are empty (return: true or false)
function checkEmptySelections() {
  let [baseCurr, quoteCurr] = getSelections();
  if (baseCurr === "0" || quoteCurr === "0")
    // empty
    return true;
  // not empty
  else return false;
}

// swap currencies
function swapCurrencies() {
  // get selections
  const [baseCurr, quoteCurr] = getSelections();
  // get values
  const [baseIn, quoteIn] = getInputs();

  if (!checkEmptySelections()) {
    // Assign them
    selectBaseCurrency.value = quoteCurr;
    selectQuoteCurrency.value = baseCurr;

    inputBaseCurrency.value = quoteIn;
    inputQuoteCurrency.value = baseIn;
    // Trigger fetch api to get new exchange rates
    getExchangeRate(selectBaseCurrency.value);
  }
}

// clear input fields
function clearFields() {
  inputBaseCurrency.value = "";
  inputQuoteCurrency.value = "";
}

// convert currencies
function convertCurrency(el) {
  if (checkEmptySelections()) return;

  const [baseIn, quoteIn] = getInputs();
  const [selectBase, selectQuote] = getSelections();
  let baseOut, quoteOut;

  if (el === inputBaseCurrency) {
    quoteOut = (baseIn * exchangeRate[selectQuote]).toFixed(2);

    if (quoteOut > 0.0) {
      inputQuoteCurrency.value = quoteOut;
    } else {
      clearFields();
    }
  }

  if (el === inputQuoteCurrency) {
    baseOut = (quoteIn / exchangeRate[selectQuote]).toFixed(2);

    if (baseOut > 0.0) {
      inputBaseCurrency.value = baseOut;
    } else {
      clearFields();
    }
  }
}

form.addEventListener("change", function (e) {
  if (!e.target.closest(".selection")) return;

  //   Do nothing if base currency is not selected
  if (getSelections()[0] === "0") return;

  //   Respond to base currency changes
  if (e.target === selectBaseCurrency)
    getExchangeRate(selectBaseCurrency.value);

  //   Respond to quote currency changes
  if (e.target === selectQuoteCurrency) renderExchangeRate();

  // Do these whatever happens
  renderWarning(0);
  e.target.blur();
});

form.addEventListener("input", function (e) {
  if (!e.target.closest("INPUT")) return;

  if (checkEmptySelections(1, 1)) renderWarning(1);
  else {
    renderWarning(0);
    convertCurrency(e.target);
  }
});

form.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.closest(".btn--swap")) return;

  swapCurrencies();
});

createOptions();
