import * as cur from "../fixtures/TS_031_Currencies.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";
import * as add from "../fixtures/TS_008_Add to Cart.json";
import * as ckt from "../fixtures/TS_012_Checkout.json";
import * as wsh from "../fixtures/TS_009_Wish List.json";
import { login } from "../support/login";

describe("Validate the complete Application functionality for different currencies", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate the complete functionality of the Application by selecting 'Euro' currency", () => {
    // Convert currency
    cy.get('[class="btn btn-link dropdown-toggle"]').click();
    cy.get('[name="EUR"]')
      .contains(cur["currency dropdown"].euro)
      .should("be.visible")
      .click();
    cy.get('[class="btn btn-link dropdown-toggle"]')
      .find("strong")
      .should("contain.text", cur.signs["euro sign"]);

    // Validate login
    login();

    // Check if prices are presented in Euros
    cy.get('[class="dropdown-toggle"]').contains("Desktops").click();
    cy.get('[class="see-all"]').contains("Show All Desktops").click();
    cy.get('[class="caption"]').should("contain", cur.signs["euro sign"]);

    // Validate adding the product to product compare
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");

    // Validate adding the product to wish list
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["euro sign"]);

    // Validate adding the product to cart
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h2").should("contain", cur.signs["euro sign"]);
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      add["added to cart"].success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["euro sign"]);

    // Validate checkout
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();

    // 1. Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get("[id=button-payment-address]").click();

    // 2. Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // 3. Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[id="button-shipping-method"]').click();

    // 4. Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // 5. Confirm Orders
    cy.get('[class="text-right"]').should("contain", cur.signs["euro sign"]);
    cy.get('[id="button-confirm"]').click();

    // 6. Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-2: Validate the complete functionality of the Application by selecting 'Pound Sterling' currency", () => {
    // Convert currency
    cy.get('[class="btn btn-link dropdown-toggle"]').click();
    cy.get('[name="GBP"]')
      .contains(cur["currency dropdown"].pound)
      .should("be.visible")
      .click();
    cy.get('[class="btn btn-link dropdown-toggle"]')
      .find("strong")
      .should("contain.text", cur.signs["pound sign"]);

    // Validate login
    login();

    // Check if prices are presented in Pounds
    cy.get('[class="dropdown-toggle"]').contains("Desktops").click();
    cy.get('[class="see-all"]').contains("Show All Desktops").click();
    cy.get('[class="caption"]').should("contain", cur.signs["pound sign"]);

    // Validate adding the product to product compare
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");

    // Validate adding the product to wish list
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["pound sign"]);

    // Validate adding the product to cart
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h2").should("contain", cur.signs["pound sign"]);
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      add["added to cart"].success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["pound sign"]);

    // Validate checkout
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();

    // 1. Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get("[id=button-payment-address]").click();

    // 2. Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // 3. Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[id="button-shipping-method"]').click();

    // 4. Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // 5. Confirm Orders
    cy.get('[class="text-right"]').should("contain", cur.signs["pound sign"]);
    cy.get('[id="button-confirm"]').click();

    // 6. Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });

  it("TC-3: Validate the complete functionality of the Application by selecting 'US Dollar' currency", () => {
    // Convert currency
    cy.get('[class="btn btn-link dropdown-toggle"]').click();
    cy.get('[name="USD"]')
      .contains(cur["currency dropdown"].dollar)
      .should("be.visible")
      .click();
    cy.get('[class="btn btn-link dropdown-toggle"]')
      .find("strong")
      .should("contain.text", cur.signs["dollar sign"]);

    // Validate login
    login();

    // Check if prices are presented in Pounds
    cy.get('[class="dropdown-toggle"]').contains("Desktops").click();
    cy.get('[class="see-all"]').contains("Show All Desktops").click();
    cy.get('[class="caption"]').should("contain", cur.signs["dollar sign"]);

    // Validate adding the product to product compare
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");

    // Validate adding the product to wish list
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["dollar sign"]);

    // Validate adding the product to cart
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h2").should("contain", cur.signs["dollar sign"]);
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      add["added to cart"].success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]').should("contain", cur.signs["dollar sign"]);

    // Validate checkout
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();

    // 1. Billing Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get("[id=button-payment-address]").click();

    // 2. Delivery Details
    cy.get('[class="radio"]').eq(0).find('[type="radio"]').should("be.checked");
    cy.get('[id="button-shipping-address"]').click();

    // 3. Delivery Method
    cy.get('[name="shipping_method"]').should("be.checked");
    cy.get('[id="button-shipping-method"]').click();

    // 4. Payment Method
    cy.get('[name="payment_method"]').should("be.checked");
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // 5. Confirm Orders
    cy.get('[class="text-right"]').should("contain", cur.signs["dollar sign"]);
    cy.get('[id="button-confirm"]').click();

    // 6. Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
  });
});
