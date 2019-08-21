'use strict';

const STORE = {
  currentMealDetails: {
    baseMealPrice: 0,
    taxRate: 0,
    tipPercentage: 0
  },
  currentCustomerCharges: {
    subtotal: 0,
    tip: 0,
    total: 0
  },
  earningsInfo: {
    tipTotal: 0,
    mealCount: 0,
    averageTip: 0
  }
};

function updateCustomerCharges(subtotal, tip, total) {
  STORE.currentCustomerCharges.subtotal = subtotal;
  STORE.currentCustomerCharges.tip = tip;
  STORE.currentCustomerCharges.total = total;
}

function updateEarningsInfo(tipTotal, mealCount, averageTip) {
  STORE.earningsInfo.tipTotal = tipTotal;
  STORE.earningsInfo.mealCount = mealCount;
  STORE.earningsInfo.averageTip = averageTip;
}

function calculateCustomerCharges(baseMealPrice, taxRate, tipPercentage) {
  const subtotal = baseMealPrice + (baseMealPrice * (taxRate / 100));
  const tip = baseMealPrice * (tipPercentage / 100);
  const total = subtotal + tip;
  return {subtotal, tip, total};
}

function calculateEarningsInfo(tip) {
  const tipTotal = STORE.earningsInfo.tipTotal + tip;
  const mealCount = STORE.earningsInfo.mealCount + 1;
  const averageTip = tipTotal / mealCount;
  return {tipTotal, mealCount, averageTip};
}

function generateCustomerChargesString(charges) {
  return `
    <h2>Customer Charges</h2>
    <li id="customer-charges__subtotal">Subtotal: <span>${charges.subtotal}</span></li>
    <li id="customer-charges__tip">Tip: <span>${charges.tip}</span></li>
    <li id="customer-charges__total">Total: <span>${charges.total}</span></li>
  `;
}

function generateEarningsInfoString(earnings) {
  return `
    <h2>My Earnings Info</h2>
    <li id="earnings-info__tip-total">Tip Total: <span>${earnings.tipTotal}</span></li>
    <li id="earnings-info__meal-count">Meal Count: <span>${earnings.mealCount}</span></li>
    <li id="earnings-info__average-tip">Average Tip Per Meal: <span>${earnings.averageTip}</span></li>
  `;
}

function renderCustomerCharges() {
  const customerChargesString = generateCustomerChargesString(STORE.currentCustomerCharges);
  $('.js-customer-charges').html(customerChargesString);
}

function renderEarningsInfo() {
  const earningsInfoString = generateEarningsInfoString(STORE.earningsInfo);
  $('.js-earnings-info').html(earningsInfoString);
}

function readInputMealDetails() {
  const baseMealPrice = $('.js-base-meal-price').val();
  const taxRate = $('.js-tax-rate').val();
  const tipPercentage = $('.js-tip-percentage').val();
  return {baseMealPrice, taxRate, tipPercentage};
}

function clearInputMealDetails() {
  $('.js-base-meal-price').val(null);
  $('.js-tax-rate').val(null);
  $('.js-tip-percentage').val(null);
}

function handleSubmitMealDetails() {
  $('#js-meal-details-form').on('submit', event => {
    event.preventDefault();

    const mealDetails = readInputMealDetails();

    const calcCharges = calculateCustomerCharges(mealDetails.baseMealPrice, mealDetails.taxRate, mealDetails.tipPercentage);
    updateCustomerCharges(calcCharges.subtotal, calcCharges.tip, calcCharges.total);

    const calcEarnings = calculateEarningsInfo(calcCharges.tip);
    updateEarningsInfo(calcEarnings.tipTotal, calcEarnings.mealCount, calcEarnings.averageTip);

    renderCustomerCharges();
    renderEarningsInfo();
  });
}

function handleCancelMealDetails() {
  $('#js-meal-details-form').on('click', '.js-cancel-button', () => {
    clearInputMealDetails();
  });
}

function handleResetApplication() {
  $('.js-reset-button').on('click', () => {
    clearInputMealDetails();
    updateCustomerCharges(0, 0, 0);
    updateEarningsInfo(0, 0, 0);
    renderCustomerCharges();
    renderEarningsInfo();
  });
}

function initializeApplication() {
  renderCustomerCharges();
  renderEarningsInfo();
}

$(() => {
  initializeApplication();
  handleSubmitMealDetails();
  handleCancelMealDetails();
  handleResetApplication();
});