import * as src from "../fixtures/TS_005_Search.json";
import * as pdp from "../fixtures/TS_007_Product Display Page.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";
import { login } from "../support/login";

describe("Validate the Product Display Page functionality for the different types of Products (product 1 - without logging in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
  });

  it("TC-1: Validate the Thumbnails of the Product displayed in the Product Display Page", () => {
    cy.get('[class="thumbnail"]').eq(0).click();
    cy.get('[class="mfp-img"]').should("be.visible");
    cy.get("[title=" + `"` + pdp.buttons["right arrow"] + `"` + "]")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get('[class="mfp-img"]').should(
      "have.attr",
      "src",
      pdp.images["image 2"]
    );
    cy.get("[title=" + `"` + pdp.buttons["left arrow"] + `"` + "]")
      .should("exist")
      .and("be.visible")
      .dblclick();
    cy.get('[class="mfp-img"]').should(
      "have.attr",
      "src",
      pdp.images["image 3"]
    );
    cy.get("[title=" + `"` + pdp.buttons.close + `"` + "]")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get('[class="thumbnail"]').eq(0).should("be.visible");
    cy.get('[class="thumbnail"]').eq(1).click();
    cy.get('[class="mfp-img"]').should(
      "have.attr",
      "src",
      pdp.images["image 2"]
    );
    cy.get("[title=" + `"` + pdp.buttons["right arrow"] + `"` + "]")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get('[class="mfp-img"]').should(
      "have.attr",
      "src",
      pdp.images["image 3"]
    );
    cy.get("[title=" + `"` + pdp.buttons["left arrow"] + `"` + "]")
      .should("exist")
      .and("be.visible")
      .dblclick();
    cy.get('[class="mfp-img"]').should(
      "have.attr",
      "src",
      pdp.images["image 1"]
    );
    cy.get("[title=" + `"` + pdp.buttons.close + `"` + "]")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get('[class="thumbnail"]').should("be.visible");
  });

  it("TC-2: Validate that Product Name, Brand and Product Code are displayed in the Product Display Page", () => {
    cy.get("h1").should("contain", src["product 1"].product);
    cy.get('[class="list-unstyled"]').should(
      "contain",
      pdp["product characteristics"].brand
    );
    cy.get('[class="list-unstyled"]').should(
      "contain",
      pdp["product characteristics"]["product code"]
    );
  });

  it("TC-3: Validate the availabilty status of the Product in the Product Display Page", () => {
    cy.get("div[class='col-sm-4'] li:nth-child(3)").should(($el) => {
      const text = $el.text();
      expect(text).to.include.oneOf([
        pdp.availabilty.in,
        pdp.availabilty.out,
        pdp.availabilty.limited,
      ]);
    });
  });

  it("TC-4: Validate the Price of the Product with and without tax is displayed in the Product Display Page", () => {
    cy.get('[class="list-unstyled"]').should("contain", pdp.prices.regular);
    cy.get('[class="list-unstyled"]').should("contain", pdp.prices["w/tax"]);
  });

  it("TC-5: Validate the default quanity for the Product is displayed as 1 in the Product Display Page, when there is no minimum quantity set for the Product", () => {
    cy.get('[name="quantity"]').should("have.value", 1);
    cy.get('[name="quantity"]').clear().type(2);
    cy.get('[name="quantity"]').should("have.value", 2);
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      pcr["added to cart"].cart
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(1)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
  });

  it("TC-6: Validate the negative quantity or zero quantity or null quantity should not be allowed in the Product Display Page", () => {
    cy.get('[name="quantity"]')
      .clear()
      .type(-1 + "{enter}");
    // Doesn't give an error message - Report Bug
  });

  it("TC-9: Validate the 'Reviews' tab when there are no reviews or zero reviews added", () => {
    cy.get('[href="#tab-review"]').click();
    cy.get('[id="review"]')
      .contains(pdp.review["no review"])
      .should("exist")
      .and("be.visible");
  });

  it("TC-10: Validate all the fields in the 'Review' tab are mandatory fields (contain a star symbol)", () => {
    cy.get('[href="#tab-review"]').click();
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
  });

  it("TC-11: Validate 'Write a review' link under 'Add to Cart' button on the 'Product Display' page", () => {
    cy.get("p > :nth-child(7)")
      .contains(pdp.review.write)
      .should("be.visible")
      .click();
    cy.get("h2").contains(pdp.review.write).should("be.visible");
  });

  it("TC-12: Validate the count of reviews should be displayed in the 'Reviews' tab label of the Product Display page", () => {
    cy.get("p > :nth-child(6)").should("contain", pdp.review.reviews);
  });

  it("TC-13: Validate 'reviews' link under the 'Add to Cart' button of Product Display Page", () => {
    cy.get("p > :nth-child(6)").should("contain", pdp.review.reviews).click();
    cy.get("h2").contains(pdp.review.write).should("be.visible");
    cy.get('[id="review"]')
      .contains(pdp.review["no review"])
      .should("exist")
      .and("be.visible");
  });

  it("TC-14: Validate submitting a review without filling the mandatory fields", () => {
    cy.get('[href="#tab-review"]').click();
    cy.get("h2").contains(pdp.review.write).should("be.visible");
    cy.get('[id="button-review"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(pdp.review.warning)
      .should("exist")
      .and("be.visible");
  });

  it("TC-15: Validate the review text given while writing is accepted according to the specified number of characters", () => {
    cy.get('[href="#tab-review"]').click();
    cy.get("h2").contains(pdp.review.write).should("be.visible");
    cy.get('[name="rating"]').eq(3).check();
    cy.get('[id="button-review"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(pdp.review["bad review text"])
      .should("exist")
      .and("be.visible");
  });

  it("TC-17: Validate proper options for liking, tweeting, sharing the Product Display page on social platforms", () => {
    // There are no such options - report bug
  });

  it("TC-18: Validate 'Related Products' section in Product Display page", () => {
    cy.get('[class="caption"]').contains(pdp.product.product).click();
    cy.get("h1").should("contain", pdp.product.product);
  });
});

describe("Validate the Product Display Page functionality for the different types of Products (product 1 - Logged In)", () => {
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
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
  });

  it("TC-16: Validate adding the product to 'Wish List' from the Product Display page", () => {
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["wish list"].success + src["product 1"].product)
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(pdp["wish list"].heading).should("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });

  it("TC-19: Validate navigating to the Product Display page by using the Product image in the 'Wish List' page", () => {
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["wish list"].success + src["product 1"].product)
      .should("be.visible");
    cy.get('[title="Wish List (1)"]').click();
    cy.get("h2").contains(pdp["wish list"].heading).should("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get("[" + "title=" + '"' + src["product 1"].product + '"' + "]")
      .eq(1)
      .click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-20: Validate navigating to the Product Display page by using the Product Name link in the 'Wish List' page", () => {
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["wish list"].success + src["product 1"].product)
      .should("be.visible");
    cy.get('[title="Wish List (1)"]').click();
    cy.get("h2").contains(pdp["wish list"].heading).should("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get(".table-responsive > .table > tbody > tr > :nth-child(2) > a")
      .contains(src["product 1"].product)
      .click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-21: Validate navigating to the Product Display page by using the Product Name link in Success message on adding the Product to Cart", () => {
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product 1"].product)
      .should("exist")
      .and("be.visible")
      .click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-22: Validate navigating to the Product Display page by using the Product Image in the 'Shopping Cart' page", () => {
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["add to cart"].success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get('[class="img-thumbnail"]').eq(1).click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-23: Validate navigating to the Product Display page by using the Product Name link in the 'Shopping Cart' page", () => {
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["add to cart"].success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get(
      ".table-responsive > .table > tbody > tr > :nth-child(2) > a"
    ).click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-24: Validate navigating to the Product Display page by using the Product Name link in the 'Confirm Order' section of the 'Checkout' page", () => {
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp["add to cart"].success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get('[class="btn btn-primary"]')
      .contains(pdp["add to cart"].checkout)
      .click();
    cy.get("h1").contains(pdp["add to cart"].checkout).should("be.visible");
    // cy.get("[id=input-payment-firstname]").type(reg.fields.firstname);
    // cy.get("[id=input-payment-lastname]").type(reg.fields.lastname);
    // cy.get('[id="input-payment-address-1"]').type(pdp["add to cart"].address);
    // cy.get('[id="input-payment-city"]').type(pdp["add to cart"].city);
    // cy.get('[id="input-payment-postcode"]').type(
    //   pdp["add to cart"]["post code"]
    // );
    // cy.get('[id="input-payment-zone"]').select("3559");
    cy.get("[id=button-payment-address]").click();
    cy.get("[id=button-shipping-address]").click();
    cy.get("[id=button-shipping-method]").click();
    cy.get('[type="checkbox"]').check();
    cy.get("[id=button-payment-method]").click();
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.wait(1000);
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=product/product&product_id=41"]'
    )
      .eq(2)
      .click();
    cy.get("h1").should("contain", src["product 1"].product);
  });

  it("TC-28: Validate the prices of the Product when purchased in bulk", () => {
    cy.get('[id="cart-total"]').click();
    cy.get(":nth-child(5) > .btn").click();
    cy.get('[name="quantity"]').clear().type(10);
    cy.get('[id="button-cart"]').click();
    cy.get('[id="cart-total"]').click();
    cy.get('[class="text-right"]').should("contain", pdp.prices["bulk price"]);
  });

  it("TC-30: Validate the Breadcrumb, Page Title, Page Heading and Page URL of the 'Product Display' page", () => {
    cy.get('[class="breadcrumb"]').should("contain", [
      src["product 1"].product,
    ]);
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=product/product&product_id=41&search=iMac"
    );
    cy.title().should("eq", src["product 1"].product);
  });
});

it("TC-25: Validate navigating to the Product Display page by using the Product Name link in the 'Cart' button toggle box", () => {
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
    .contains(pdp["add to cart"].success)
    .should("exist")
    .and("be.visible");
  cy.get('[id="cart"]').click();
  cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
    .eq(1)
    .click();
  cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  cy.wait(1000);
  cy.get(
    '[href="https://awesomeqa.com/ui/index.php?route=product/product&product_id=41"]'
  )
    .eq(3)
    .should("contain", src["product 1"].product)
    .click();
  cy.get("h1").should("contain", src["product 1"].product);
});

describe("Validate the Product Display Page functionality for the different types of Products (product 2 - without logging in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[id="search"]').type(pdp.product.product + "{enter}");
    cy.get('[class="caption"]').should("contain", pdp.product.product);
    cy.get('[class="caption"]').contains(pdp.product.product).click();
  });
  it("TC-7: Validate the Product having the minimum quanitity set", () => {
    cy.get('[name="quantity"]').should("have.value", 2);
    cy.get('[class="alert alert-info"]')
      .contains(pdp["minimum quantity"].warning)
      .should("exist")
      .and("be.visible");
    cy.get('[class="radio"] input[type="radio"]').eq(0).check();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get('[placeholder="Text"]').clear().type("Test");
    cy.get('[id="input-option217"]').select("1");
    cy.get('[placeholder="Textarea"]').type("Area");
    cy.get('[id="button-upload222"]').attachFile("Apple Cinema.txt");
    Cypress.on("window:confirm", (t) => {
      expect(t).to.contains("Your file was successfully uploaded!");
    });
    cy.get('[name="quantity"]').clear().type(1);
    cy.get('[id="button-cart"]').click();
    // Doesn't give an error message - Report Bug
  });

  it("TC-8: Validate the User is able to write a review for the Product from the 'Reviews' tab of Product Display Page", () => {
    cy.get('[href="#tab-review"]').click();
    cy.get("h2").contains(pdp.review.write).should("be.visible");
    cy.get('[id="input-name"]').type(pdp.review.name);
    cy.get('[id="input-review"]').type(pdp.review.text);
    cy.get('[name="rating"]').eq(4).check();
    cy.get('[id="button-review"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pdp.review.success)
      .should("exist")
      .and("be.visible");
  });
});

describe("Validate the Product Display Page functionality for the different types of Products (product 2 - Logged In))", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[id="search"]').type(pdp.product.product + "{enter}");
    cy.get('[class="caption"]').should("contain", pdp.product.product);
    cy.get('[class="caption"]').contains(pdp.product.product).click();
  });

  it("TC-26: Validate the Reward Points displayed in the Product Display page", () => {
    cy.get('[class="list-unstyled"]').should(
      "contain",
      pdp["reward points"].price
    );
  });

  it("TC-27: Validate the original price of the Product without offer in the Product Display page", () => {
    cy.get('[class="list-unstyled"]')
      .contains(pdp.prices["original price"])
      .should(
        "have.css",
        "text-decoration",
        "line-through solid rgb(102, 102, 102)"
      );
  });

  it("TC-29: Validate all the extra available options in the Product Display page", () => {
    cy.get('[class="radio"] input[type="radio"]').eq(0).check();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get('[placeholder="Text"]').clear().type("Test");
    cy.get('[id="input-option217"]').select("1");
    cy.get('[placeholder="Textarea"]').type("Area");
    cy.get('[id="button-upload222"]').attachFile("Apple Cinema.txt");
    Cypress.on("window:confirm", (t) => {
      expect(t).to.contains("Your file was successfully uploaded!");
    });
    cy.get('[data-date-format="YYYY-MM-DD"]').clear().type("2024-02-11");
    cy.get('[data-date-format="HH:mm"]').clear().type("18:38");
    cy.get('[data-date-format="YYYY-MM-DD HH:mm"]')
      .clear()
      .type("2024-02-11 18:38");
  });
});
