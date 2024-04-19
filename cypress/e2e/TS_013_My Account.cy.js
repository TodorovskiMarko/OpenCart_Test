import * as reg from "../fixtures/TS_001_Register.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import * as ckt from "../fixtures/TS_012_Checkout.json";
import * as mac from "../fixtures/TS_013_My Account.json";
import { login } from "../support/login";

describe("TC-1: Validate the My Account functionality", () => {
  beforeEach("TC-2: Validate navigating to 'My Account' page on login", () => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
  });

  it("TC-1: Validate navigating to 'My Account' page from the 'Order Success' page", () => {
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
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/account"]')
      .contains(mac["order success"].myacc)
      .click();
  });

  it("TC-3: Validate navigating to 'My Account' page using 'My Account' option", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(mac["dropdown menu"].myacc)
      .should("be.visible")
      .click();
  });

  it("TC-4: Validate navigating to 'My Account' page using 'Right Column' options", () => {
    cy.get('[class="list-group-item"]')
      .contains(mac["right column"].oh)
      .click();
    cy.get('[class="list-group-item"]')
      .contains(mac["dropdown menu"].myacc)
      .click();
  });

  it("TC-5: Validate navigating to 'My Account' page using 'My Account' option in Site Map page", () => {
    cy.get('[class="list-unstyled"]')
      .contains("Site Map")
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(mac["dropdown menu"].myacc).click();
  });

  it("TC-6: Validate Breadcrump, Page URL, Page Heading and Page Title of the 'My Account' page", () => {
    cy.get('[class="breadcrumb"]').should("contain", mac.breadcrumb.acc);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/account"
    );
    cy.get("h2").should("contain.text", mac["dropdown menu"].myacc);
    cy.title().should("eq", mac["dropdown menu"].myacc);
  });

  afterEach(() => {
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });
});
