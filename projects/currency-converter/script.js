"use strict";

const form = document.querySelector(".converter__form");
const selectBaseCurrency = document.querySelector("#base-currency");
const selectQuoteCurrency = document.querySelector("#quote-currency");
const inputBaseCurrency = document.querySelector("#input-base-currency");
const inputQuoteCurrency = document.querySelector("#input-quote-currency");
const rateText = document.querySelector("#rate");

// currency list
const currencies = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "CHF",
  "CAD",
  "AUD",
  "CNY",
  "INR",
  "BRL",
  "RUB",
  "KRW",
  "ZAR",
  "MXN",
  "SGD",
  "NZD",
  "HKD",
  "NOK",
  "SEK",
  "TRY",
  "AED",
  "AFN",
  "XCD",
  "ALL",
  "AMD",
  "AOA",
  "ARS",
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
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CDF",
  "XAF",
  "CLP",
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
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
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
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
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
  "ZMW",
  "ZWL",
  "MRU",
  "STN",
];

let exchangeRate, today, selectedBaseCurr;

// Validate inputs
function truncInputs() {
  const [baseIn, quoteIn] = getInputs();

  if (baseIn > 999999999) {
    inputBaseCurrency.value = 999999999;
  }

  if (quoteIn > 999999999) {
    inputQuoteCurrency.value = 999999999;
  }

  if (baseIn < 0) {
    inputBaseCurrency.value = "";
  }

  if (quoteIn < 0) {
    inputQuoteCurrency.value = "";
  }
}

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
      convertCurrency(selectBaseCurrency);
    })
    .catch((err) => console.log(err));
}

// Render exchange rate
function renderExchangeRate(text) {
  const [baseCurr, quoteCurr] = getSelections();

  if (text) rateText.textContent = text;

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
  /* 
  convertCurrency(el) function will be called:

  -when Base Currency is selected
  -When Base currency and any input is provided --> check if either input is provided ✅

  */

  // get base currency input and quote currency input
  const [baseIn, quoteIn] = getInputs();

  if (baseIn <= 0 && quoteIn <= 0) return;

  // get quote selection
  const [baseCurr, quoteCurr] = getSelections();

  if (quoteCurr === "0") return;
  else {
    if (el === inputBaseCurrency || el === selectQuoteCurrency) {
      inputQuoteCurrency.value = baseIn * exchangeRate[quoteCurr];
    }

    if (el === inputQuoteCurrency || el === selectBaseCurrency) {
      console.log("called");
      inputBaseCurrency.value = quoteIn / exchangeRate[quoteCurr];
    }
  }
}

form.addEventListener("change", function (e) {
  if (!e.target.closest(".selection")) return;

  // get selection
  const [baseCurr, quoteCurr] = getSelections();

  // store selected element
  const selectedEl = e.target;

  // Do nothing if base currency is not selected
  if (baseCurr === "0") {
    renderExchangeRate("N/A");
    selectedEl.blur();
    return;
  }

  //   Respond to base currency changes
  if (selectedEl === selectBaseCurrency) {
    // get exchange rate
    getExchangeRate(selectBaseCurrency.value);

    // do the conversion --> happen inside the getExchangeRate() for now
  }

  //   Respond to quote currency changes
  if (selectedEl === selectQuoteCurrency) {
    if (quoteCurr === "0") {
      renderExchangeRate("N/A");
      selectedEl.blur();
    } else {
      renderExchangeRate();
      convertCurrency(selectedEl);
      selectedEl.blur();
    }
  }

  // Do these whatever happens
  renderWarning(0);
});

form.addEventListener("input", function (e) {
  const selected = e.target;
  if (!selected.closest("INPUT")) return;

  // Return if Base currency is not selected
  if (selectBaseCurrency.value === "0") return;

  // Get inputted values
  const [baseIn, quoteIn] = getInputs();

  // return if baseInput and quoteInput both are empty
  if (!(baseIn || quoteIn)) {
    renderWarning(0);
    return;
  }

  // get selections
  const [baseCurr, quoteCurr] = getSelections();

  // return if baseCurr and quoteCurr both are not selected
  if (baseCurr === "0" && quoteCurr === "0") {
    renderWarning(1);
    return;
  }

  // remove warning outline
  renderWarning(0);

  // send the selected input for conversion
  convertCurrency(selected);

  // truncate the input
  truncInputs();
});

form.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.closest(".btn--swap")) return;

  swapCurrencies();
});

createOptions();
