function showShipping() {
  var contactInfoForm = document.getElementById("contact-info-form");
  var shippingInfoForm = document.getElementById("shipping-info-form");
  var shippingInfo = document.getElementById("shipping-info");
  var standardShipping = document.getElementById("standardShipping");
  var expressShipping = document.getElementById("expressShipping");
  var shippingButton = document.getElementById("shippingButton");

  // Display filled values
  document.getElementById("displayEmail").innerText =
    document.getElementById("email").value;
  document.getElementById("displayPhone").innerText =
    document.getElementById("phone").value;
  document.getElementById("displayFirstName").innerText =
    document.getElementById("firstName").value;
  document.getElementById("displayLastName").innerText =
    document.getElementById("lastName").value;
  document.getElementById("displayStreetAddress1").innerText =
    document.getElementById("streetAddress1").value;
  document.getElementById("displayStreetAddress2").innerText =
    document.getElementById("streetAddress2").value;

  // Hide contact info and shipping info forms
  contactInfoForm.style.display = "none";
  shippingInfoForm.style.display = "none";

  // Display the shipping info section
  shippingInfo.style.display = "block";

  // Enable the shipping methods
  standardShipping.disabled = false;
  expressShipping.disabled = false;

  // Enable the shipping button
  shippingButton.disabled = false;
}

function showPayment() {
  var shippingInfo = document.getElementById("shipping-info");
  var paymentButton = document.getElementById("paymentButton");

  // Hide shipping info section
  shippingInfo.style.display = "none";

  // Enable the payment button
  paymentButton.disabled = false;
}

function showPaymentInfo() {
  var paymentInfoForm = document.getElementById("payment-info-form");
  var paymentInfo = document.getElementById("payment-info");
  var cardNumber = document.getElementById("cardNumber").value;
  var nameOnCard = document.getElementById("nameOnCard").value;

  // Display filled payment information
  document.getElementById("displayCardNumber").innerText = cardNumber;
  document.getElementById("displayNameOnCard").innerText = nameOnCard;

  // Hide payment info form
  paymentInfoForm.style.display = "none";

  // Display the payment info section
  paymentInfo.style.display = "block";
}

// Check if all required fields are filled to enable the button and shipping methods
document.getElementById("checkoutForm").addEventListener("input", function () {
  var requiredFields = document.querySelectorAll(
    "#email, #phone, #firstName, #lastName, #streetAddress1"
  );
  var isFilled = Array.from(requiredFields).every(function (field) {
    return field.value.trim() !== "";
  });

  // Enable the button and shipping methods if all fields are filled
  document.getElementById("continueButton").disabled = !isFilled;
  document.getElementById("standardShipping").disabled = !isFilled;
  document.getElementById("expressShipping").disabled = !isFilled;
});

// Enable the payment info button when a shipping method is selected
document.getElementById("shipping-info").addEventListener("input", function () {
  var paymentButton = document.getElementById("paymentButton");
  var shippingMethodSelected = document.querySelector(
    'input[name="shippingMethod"]:checked'
  );

  if (shippingMethodSelected) {
    paymentButton.disabled = false;
  } else {
    paymentButton.disabled = true;
  }
});
