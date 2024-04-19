import * as src from "../fixtures/TS_005_Search.json";
import * as pdp from "../fixtures/TS_007_Product Display Page.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";
import * as add from "../fixtures/TS_008_Add to Cart.json";
import { login } from "../support/login";


describe("Validate the working of 'Add to Cart' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-1: Validate adding the product to Cart from 'Product Display' Page", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
  });

  it("TC-2: Validate adding the product to Cart from 'Wish List' Page", () => {
    login()
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Add to Wish List"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["wish list"].success + src["product 1"].product)
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(pdp["wish list"].heading).should("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Add to Cart"]').click();
  });

  it("TC-3: Validate adding the product to Cart from Search Results Page", () => {
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
  });

  it("TC-4: Validate adding the product to Cart from the Related Products section of the Product Display Page", () => {
    cy.get('[name="search"]')
      .eq(0)
      .clear()
      .type(pdp.product.product + "{enter}");
    cy.get('[class="caption"]').eq(0).should("contain", pdp.product.product);
    cy.get('[class="caption"]').contains(pdp.product.product).click();
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
  });

  it("TC-5: Validate adding the product to Cart from the Products displayed in the category or sub-category page", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(add["dropdown menu"].desktop)
      .click();
    cy.get('[class="see-all"]')
      .contains(add["dropdown menu"]["show all"])
      .should("be.visible")
      .click();
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=product/category&path=20_27"]'
    )
      .eq(1)
      .click();
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
  });

  afterEach(() => {
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
  });
});

it("TC-6: Validate adding the product to Cart from the Products displayed in the 'Featured' section of Home page", () => {
  cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
  cy.get('[title="TheTestingAcademy eCommerce"]').should(
    "have.attr",
    "src",
    "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
  );
  cy.get(`[onclick="cart.add('43');"]`).click();
  cy.get('[class="alert alert-success alert-dismissible"]').should(
    "contain",
    add["added to cart"].success + add["featured product"].product
  );
  cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
    .eq(2)
    .click();
  cy.get("h1")
    .should("contain", pcr["added to cart"].heading)
    .and("be.visible");
  cy.get('[class="text-left"]').should(
    "contain",
    add["featured product"].product
  );
});

it("TC-7: Validate the Breadcrumb, Page Title, Page Heading and Page URL of the Cart page", () => {
  cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
  cy.get('[title="TheTestingAcademy eCommerce"]').should(
    "have.attr",
    "src",
    "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
  );
  cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
  cy.get('[class="caption"]').should("contain", src["product 1"].product);
  cy.get('[class="caption"]').contains(src["product 1"].product).click();
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
  cy.get('[class="breadcrumb"]').should(
    "contain",
    pcr["added to cart"].heading
  );
  cy.title().should("eq", pcr["added to cart"].heading);
  cy.url().should(
    "eq",
    "https://awesomeqa.com/ui/index.php?route=checkout/cart"
  );
});
