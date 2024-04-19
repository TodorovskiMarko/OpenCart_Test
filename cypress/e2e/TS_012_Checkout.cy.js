import * as reg from "../fixtures/TS_001_Register.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import * as ckt from "../fixtures/TS_012_Checkout.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Verify the working of Checkout functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate navigating to Checkout page when there are no products added to the Shopping Cart", () => {
    cy.get('[title="Checkout"]').click();
    cy.get("h1").should("contain", spc.cart.shopping);
    cy.get('[id="content"]')
      .find("p")
      .contains(spc.page.empty)
      .should("be.visible");
  });

  it("TC-2: Validate navigating to Checkout page from 'Shopping Cart' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
  });

  it("TC-3: Validate navigating to Checkout page using 'Shopping Cart' header option", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[title="Checkout"]').click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
  });

  it("TC-4: Validate navigating to Checkout page using 'Checkout' option in the Cart block", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[id="cart"]').click();
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=checkout/checkout"]'
    )
      .eq(1)
      .contains(ckt.checkout.checkout)
      .click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
  });

  it("TC-16: Validate Guest Checkout", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
    cy.get('[value="guest"]').should("not.be.checked").check();
    cy.get('[id="button-account"]').click();

    // Billing Details
    cy.get('[id="account"]').should("be.visible");
    cy.get('[class="checkbox"]').should("contain.text", ckt.guest.checkbox);
    cy.get('[type="checkbox"]').should("be.checked");
    cy.get('[id="input-payment-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-payment-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-payment-email"]').type(ckt.guest.email);
    cy.get('[id="input-payment-telephone"]').type(ckt.guest.tel);
    cy.get('[id="input-payment-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-payment-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-payment-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );
    cy.get('[id="input-payment-zone"]')
      .select("3554")
      .should("contain.text", ckt["billing details"]["new address"].region);
    cy.get('[id="button-guest"]').click();

    // Delivery Method
    cy.get('[class="panel-body"]')
      .find("p")
      .contains(ckt["delivery method"].select)
      .should("be.visible");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[class="panel-body"]')
      .find("p")
      .contains(ckt["payment method"].select)
      .should("be.visible");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="table-responsive"]').should("be.visible");
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-17: Validate Checkout as New User", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
    cy.get('[value="register"]').should("be.checked");
    cy.get("[id=button-account]").dblclick();

    // Account & Billing Details
    cy.get('[id="account"]').should("be.visible");
    cy.get('[id="input-payment-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-payment-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-payment-email"]').type(ckt["new register"].email);
    cy.get('[id="input-payment-telephone"]').type(ckt.guest.tel);
    cy.get('[id="input-payment-password"]').type(ckt["new register"].pass);
    cy.get('[id="input-payment-confirm"]').type(ckt["new register"].pass);
    cy.get('[id="input-payment-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-payment-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-payment-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );
    cy.get('[id="input-payment-zone"]')
      .select("3554")
      .should("contain.text", ckt["billing details"]["new address"].region);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-register"]').click();

    // Delivery Method
    cy.get('[class="panel-body"]')
      .find("p")
      .eq(3)
      .contains(ckt["delivery method"].select)
      .should("be.visible");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[class="panel-body"]')
      .find("p")
      .contains(ckt["payment method"].select)
      .should("be.visible");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="table-responsive"]').should("be.visible");
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-18: Checkout by SigningIn", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[id="button-login"]').click();

    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });
});

describe("Verify the working of Checkout functionality (logged in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");
  });

  it("TC-5: Validate Checkout as SignedIn User (SignIn Checkout) by using an existing address during checkout", () => {
    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-6: Validate Checkout as SignedIn User (SignIn Checkout) by entering new address into the mandatory fields of the Billing Details section during checkout", () => {
    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked")
      .check();
    cy.get('[id="input-payment-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-payment-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-payment-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-payment-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-payment-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );
    cy.get('[id="input-payment-zone"]')
      .select("3554")
      .should("contain.text", ckt["billing details"]["new address"].region);
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-7: Validate Checkout as SignedIn User (SignIn Checkout) by entering new address into all the fields of the Billing Details section during checkout", () => {
    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked")
      .check();
    cy.get('[id="input-payment-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-payment-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-payment-company"]').type(
      ckt["billing details"]["new address"].company
    );
    cy.get('[id="input-payment-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-payment-address-2"]').type(
      ckt["billing details"]["new address"]["address 2"]
    );
    cy.get('[id="input-payment-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-payment-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );
    cy.get('[id="input-payment-zone"]')
      .select("3554")
      .should("contain.text", ckt["billing details"]["new address"].region);
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-8: Validate text fields in Billing Details of the Checkout page has Placeholders", () => {
    cy.get('[class="radio"]').eq(1).find('[type="radio"]').check();
    cy.get('[id="input-payment-firstname"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.firstname
    );
    cy.get('[id="input-payment-lastname"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.lastname
    );
    cy.get('[id="input-payment-company"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.company
    );
    cy.get('[id="input-payment-address-1"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.address
    );
    cy.get('[id="input-payment-address-2"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders["address 2"]
    );
    cy.get('[id="input-payment-city"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.city
    );
    cy.get('[id="input-payment-postcode"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders["post code"]
    );
  });

  it("TC-9: Validate without entering any fields in the Billing Section of the Checkout Page", () => {
    cy.get('[class="radio"]').eq(1).find('[type="radio"]').check();
    cy.get("[id=button-payment-address]").click();
    const expectedSentences = [
      ckt["billing details"].warnings.firstname,
      ckt["billing details"].warnings.lastname,
      ckt["billing details"].warnings.address,
      ckt["billing details"].warnings.city,
      ckt["billing details"].warnings["post code"],
      ckt["billing details"].warnings.region,
    ];

    const actualSentences = [];
    cy.get('[class="text-danger"]')
      .each(($el) => {
        actualSentences.push($el.text().trim());
      })
      .then(() => {
        expect(actualSentences).to.deep.equal(expectedSentences);
      });
  });

  it("TC-10: Validate Checkout as SignedIn User (SignIn Checkout) by entering new address into the mandatory fields of the Delivery Details section during checkout", () => {
    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[name="shipping_address"]').eq(1).check();
    cy.get('[id="input-shipping-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-shipping-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-shipping-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-shipping-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-shipping-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );

    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-11: Validate Checkout as SignedIn User (SignIn Checkout) by entering new address into all the fields of the Delivery Details section during checkout", () => {
    // Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[class="radio"]')
      .eq(0)
      .should("contain", ckt["billing details"]["existing address"]);
    cy.get('[name="address_id"]').should(
      "contain.text",
      ckt["billing details"].text
    );
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked");
    cy.get('[name="shipping_address"]').eq(1).check();
    cy.get('[id="input-shipping-firstname"]').type(
      ckt["billing details"]["new address"].firstname
    );
    cy.get('[id="input-shipping-lastname"]').type(
      ckt["billing details"]["new address"].lastname
    );
    cy.get('[id="input-shipping-company"]').type(
      ckt["billing details"]["new address"].company
    );
    cy.get('[id="input-shipping-address-1"]').type(
      ckt["billing details"]["new address"].address
    );
    cy.get('[id="input-shipping-address-2"]').type(
      ckt["billing details"]["new address"]["address 2"]
    );
    cy.get('[id="input-shipping-city"]').type(
      ckt["billing details"]["new address"].city
    );
    cy.get('[id="input-shipping-postcode"]').type(
      ckt["billing details"]["new address"]["post code"]
    );
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[class="radio"]').should(
      "contain.text",
      ckt["delivery method"].rate
    );
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[class="radio"]').should("contain.text", ckt["payment method"].cod);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", ckt["confirm order"].model);
    cy.get('[class="text-right"]').should(
      "contain",
      ckt["confirm order"]["unit price"]
    );
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-12: Validate text fields in Delivery Details of the Checkout page has Placeholders", () => {
    // Billing Details
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[name="shipping_address"]').eq(1).check();
    cy.get('[id="input-shipping-firstname"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.firstname
    );
    cy.get('[id="input-shipping-lastname"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.lastname
    );
    cy.get('[id="input-shipping-company"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.company
    );
    cy.get('[id="input-shipping-address-1"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.address
    );
    cy.get('[id="input-shipping-address-2"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders["address 2"]
    );
    cy.get('[id="input-shipping-city"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders.city
    );
    cy.get('[id="input-shipping-postcode"]').should(
      "have.attr",
      "placeholder",
      ckt["billing details"].placehorders["post code"]
    );
  });

  it("TC-13: Validate without entering any fields in the Delivery Details Section of the Checkout Page", () => {
    // Billing Details
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[name="shipping_address"]').eq(1).check();
    cy.get('[id="button-shipping-address"]').click();

    const expectedSentences = [
      ckt["billing details"].warnings.firstname,
      ckt["billing details"].warnings.lastname,
      ckt["billing details"].warnings.address,
      ckt["billing details"].warnings.city,
    ];

    const actualSentences = [];
    cy.get('[class="text-danger"]')
      .each(($el) => {
        actualSentences.push($el.text().trim());
      })
      .then(() => {
        expect(actualSentences).to.deep.equal(expectedSentences);
      });
  });

  it("TC-14: Validate adding comments about your order in the 'Delivery Method' section of Checkout page", () => {
    // Billing Details
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[id="button-shipping-address"]').click();

    //Delivery Method
    cy.get('[name="comment"]').type(ckt["delivery method"].comment);
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-15: Validate adding comments about your order in the 'Payment Method' section of Checkout page", () => {
    // Billing Details
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[id="button-shipping-address"]').click();

    //Delivery Method
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="comment"]').eq(1).type(ckt["payment method"].comment);
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });
});
