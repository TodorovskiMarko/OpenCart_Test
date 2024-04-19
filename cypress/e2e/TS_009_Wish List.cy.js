import * as reg from "../fixtures/TS_001_Register.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as wsh from "../fixtures/TS_009_Wish List.json";
import * as add from "../fixtures/TS_008_Add to Cart.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";
import * as lgt from "../fixtures/TS_003_Logout.json";
import { login } from "../support/login";

describe("Validate the working of 'Wish List' functionality part 1", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
   login()
  });

  it("TC-1: Validate adding a product to 'Wish List' page from the Product that is displayed in the 'Related Products' section of 'Product Display' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
  });

  it("TC-3: Validate adding the product to Wish List from the Products displayed in the category or sub-category page", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(add["dropdown menu"].desktop)
      .click();
    cy.get('[class="see-all"]')
      .contains(add["dropdown menu"]["show all"])
      .click();
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=product/category&path=20_27"]'
    )
      .eq(1)
      .click();
    cy.get('[data-original-title="Add to Wish List"]').click();
  });

  it("TC-4: Validate adding a product to 'Wish List' page from the Search Results page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Add to Wish List"]').click();
  });

  afterEach(() => {
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });
});

describe("Validate the working of 'Wish List' functionality part 2", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
   login()
  });

  it("TC-5: Validate navigating to 'My Wish List' page using the 'Wish List' header option", () => {
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
  });

  it("TC-6: Validate navigating to 'My Wish List' page using the 'Right Column' header options", () => {
    cy.get('[class="list-group-item"]').contains(wsh.wish["wish list"]).click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
  });

  it("TC-7: Validate navigating to 'My Wish List' page from the 'My Account' page", () => {
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .contains(wsh.wish.modify)
      .click();
  });

  it("TC-8: Validate navigating to 'My Wish List' page from the 'Footer' options ", () => {
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(3)
      .click();
  });

  afterEach(() => {
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });
});

describe("Validate the working of 'Wish List' functionality part 3", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login()
  });

  it("TC-2: Validate adding a product to 'Wish List' page from the Product that is displayed in the 'Featured' section of 'Home' page", () => {
    cy.get('[title="TheTestingAcademy eCommerce"]')
      .should(
        "have.attr",
        "src",
        "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
      )
      .click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + add["featured product"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should(
      "contain",
      add["featured product"].product
    );
  });

  it("TC-9: Validate the 'My Wish List' page when there are no products added", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(lgt.logout.logout)
      .should("be.visible")
      .click();
    cy.get('[id="content"]').contains(lgt.logout.heading).should("be.visible");
    cy.get('[class="pull-right"]')
      .contains(reg["created acc"].continue)
      .click();
    login()
    cy.get(
      '[class="btn btn-inverse btn-block btn-lg dropdown-toggle"]'
    ).click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
    cy.get("p").contains(wsh.wish.empty).should("be.visible");
  });

  it("TC-10: Validate the 'My Wish List' page when only one product is added to it", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", wsh["product details"].model);
    cy.get('[class="text-right"]')
      .should("contain", wsh["product details"].stock)
      .and("contain", wsh["product details"]["unit price"])
      .find('[class="btn btn-primary"]')
      .should("have.attr", "data-original-title", "Add to Cart");
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=account/wishlist&remove=41"]'
    ).should("be.visible");
  });

  it("TC-11: Validate adding duplicate products to 'My Wish List' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]')
      .contains(src["product 1"].product)
      .should("not.have.length", 2);
  });

  it("TC-12: Validate the removing the Product  from 'My Wish List' page", () => {
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(0)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=account/wishlist&remove=41"]'
    )
      .should("be.visible")
      .click();
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=account/wishlist&remove=43"]'
    )
      .should("be.visible")
      .click();
    cy.get(".alert")
      .contains(wsh.wish.removed)
      .should("exist")
      .and("be.visible");
    cy.get("p").contains(wsh.wish.empty).should("be.visible");
  });

  it("TC-13: Validate adding the product to Cart from the 'My Wish List' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[class="text-right"]')
      .find('[class="btn btn-primary"]')
      .should("have.attr", "data-original-title", "Add to Cart")
      .eq(0)
      .click();
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

  it("TC-14: Validate adding the multiple products to the 'My Wish List' page", () => {
    cy.get('[id="search"]').type(add["featured product"].product + "{enter}");
    cy.get('[class="caption"]').should(
      "contain",
      add["featured product"].product
    );
    cy.get('[class="caption"]')
      .contains(add["featured product"].product)
      .click();
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + add["featured product"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]')
      .should("contain", src["product 1"].product)
      .and("contain", add["featured product"].product);
  });

  it("TC-15: Validate the Breadcrumb, Page Title, Page Heading and Page URL of the 'Wish List' page", () => {
    cy.get('[class="list-group-item"]').contains(wsh.wish["wish list"]).click();
    cy.get('[class="breadcrumb"]')
      .should("contain", wsh.breadcrumb.acc)
      .and("contain", wsh.wish["wish list"]);
    cy.title().should("eq", wsh.added.heading);
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/wishlist"
    );
  });
});
