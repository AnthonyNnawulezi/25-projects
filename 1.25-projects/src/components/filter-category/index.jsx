import { useEffect, useState } from "react";
import "./style.css";

function FilterProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();

      if (result && result.products && result.products.length > 0) {
        setProducts(result.products);
        setFilteredItems(result.products);
      }
    } catch (error) {
      `Error fetching Products, ${error}`;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const copiedProducts = [...products];
    setFilteredItems(
      currCategory !== ""
        ? copiedProducts.filter(
            (product) =>
              product.category.toLowerCase() === currCategory.toLowerCase(),
          )
        : copiedProducts,
    );
  }, [currCategory, products]);

  const uniqueCategories =
    products && products.length > 0
      ? [...new Set(products.map((product) => product.category))]
      : [];

  if (loading) {
    return <h3>Fetching Products. Please wait!</h3>;
  }

  return (
    <div className="container">
      <h1>Filter Products By Category</h1>
      <div className="category-container">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setCurrCategory((prevCategory) =>
                prevCategory === category ? "" : category,
              )
            }
            className={currCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="list-of-products">
        {filteredItems.length > 0
          ? filteredItems.map((product) => (
              <li key={product.id}>
                <p>{product.title}</p>
                <button>{product.category}</button>
              </li>
            ))
          : null}
      </div>
    </div>
  );
}

export default FilterProducts;


import { useState } from "react";
import "./style.css";

const DEFAULT_TIP_PERCENTAGE = 10;
const DEFAULT_PEOPLE_COUNT = 1;

function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(
    DEFAULT_TIP_PERCENTAGE
  );
  const [numberOfPeople, setNumberOfPeople] = useState(
    DEFAULT_PEOPLE_COUNT
  );
  const [calculationResult, setCalculationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function calculateTip() {
    const bill = Number(billAmount);

    if (bill <= 0) {
      setErrorMessage("Please enter a valid bill amount.");
      setCalculationResult(null);
      return;
    }

    if (numberOfPeople <= 0) {
      setErrorMessage("Number of people must be at least 1.");
      setCalculationResult(null);
      return;
    }

    if (tipPercentage < 0) {
      setErrorMessage("Tip percentage cannot be negative.");
      setCalculationResult(null);
      return;
    }

    const tipAmount = bill * (tipPercentage / 100);
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalPerPerson = totalAmount / numberOfPeople;

    setCalculationResult({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2),
    });

    setErrorMessage("");
  }

  return (
    <div className="tip-calculator-container">
      <h1>Tip Calculator</h1>

      <div className="input-wrapper">
        <label htmlFor="billAmount">
          Bill Amount
        </label>

        <input
          id="billAmount"
          type="number"
          min="0"
          step="0.01"
          value={billAmount}
          onChange={(event) =>
            setBillAmount(event.target.value)
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="tipPercentage">
          Tip Percentage
        </label>

        <input
          id="tipPercentage"
          type="number"
          min="0"
          value={tipPercentage}
          onChange={(event) =>
            setTipPercentage(Number(event.target.value))
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="numberOfPeople">
          Number of People
        </label>

        <input
          id="numberOfPeople"
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(event) =>
            setNumberOfPeople(Number(event.target.value))
          }
        />
      </div>

      <button onClick={calculateTip}>
        Calculate Tip
      </button>

      {errorMessage && (
        <p className="error">
          {errorMessage}
        </p>
      )}

      {calculationResult && (
        <div className="result">
          <p>
            Tip Amount:
            {" "}
            ${calculationResult.tipAmount}
          </p>

          <p>
            Total Amount:
            {" "}
            ${calculationResult.totalAmount}
          </p>

          <p>
            Tip Per Person:
            {" "}
            ${calculationResult.tipPerPerson}
          </p>

          <p>
            Total Per Person:
            {" "}
            ${calculationResult.totalPerPerson}
          </p>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
