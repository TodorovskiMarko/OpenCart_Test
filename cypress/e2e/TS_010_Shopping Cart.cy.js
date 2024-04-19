import * as reg from "../fixtures/TS_001_Register.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import {Cryptography} from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of 'Shopping Cart' functionality", () => {
  let skipAfterEach = false;
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

  it("TC-1: Validate navigating to 'Shopping Cart' page from the Success message", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
  });

  it("TC-2: Validate navigating to 'Shopping Cart' page from the 'Shopping Cart' header option", () => {
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(0)
      .click();
  });

  it.skip("TC-3: Validate navigating to 'Shopping Cart' page from the 'Site Map' footer page", () => {
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=information/sitemap"]'
    ).click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/order"]')
      .contains(spc.cart.Shopping)
      .click();
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();

    //User is taken to the Order History page instead of the Shopping Cart page - report defect!
  });

  it("TC-4: Validate navigating to 'Shopping Cart' page using the 'View Cart' option in the Cart block", () => {
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[id="cart"]').click();
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.cart.view)
      .click();
  });

  it("TC-5: Validate the weight of the Product in the 'Shopping Cart' page", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get("h1").should("contain", spc.cart.weight);
  });

  it("TC-6: Validate Image, Name, Model, Quantity, Unit Price and Total of the Product in the 'Shopping Cart' page", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="text-center"]')
      .find('[class="img-thumbnail"]')
      .should(
        "have.attr",
        "src",
        "https://awesomeqa.com/ui/image/cache/catalog/demo/imac_1-47x47.jpg"
      );
    cy.get('[class="text-left"]').should("contain", spc.page.model);
    cy.get('[class="input-group btn-block"]')
      .find('[class="form-control"]')
      .should("have.value", 1);
    cy.get('[class="text-right"]').should("contain", spc.page["unit price"]);
  });

  it("TC-7: Validate updating the quantity of the Product in the 'Shopping Cart' page", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="input-group btn-block"]')
      .find('[class="form-control"]')
      .clear()
      .type(2);
    cy.get('[data-original-title="Update"]').eq(0).click();
    cy.get(".alert")
      .contains(spc.page.modify)
      .should("exist")
      .and("be.visible");
    cy.get('[class="input-group btn-block"]')
      .find('[class="form-control"]')
      .should("have.value", 2);
  });

  it.skip("TC-8: Validate updating the quantity of the Product in the 'Shopping Cart' page to a negative or zero or a non-numerical value", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="input-group btn-block"]')
      .find('[class="form-control"]')
      .clear()
      .type(0);
    cy.get('[data-original-title="Update"]').eq(0).click();
    skipAfterEach = true;

    //It doesn't give a warning, instead it empties the shopping cart - report defect!
  });

  it("TC-9: Validate removing the item from 'Shopping Cart' page", () => {
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[data-original-title="Remove"]').click();
    cy.get('[id="content"]')
      .find("p")
      .contains(spc.page.empty)
      .should("be.visible");
    skipAfterEach = true;
  });

  it("TC-10: Validate the Cart button when there are no products added to the Shopping Cart", () => {
    cy.get(
      '[class="btn btn-inverse btn-block btn-lg dropdown-toggle"]'
    ).click();
    cy.get('[class="dropdown-menu pull-right"]').should(
      "contain",
      spc.page.empty
    );
    skipAfterEach = true;
  });

  afterEach(() => {
    if (!skipAfterEach) {
      cy.get("h1").should("contain", spc.added.heading).and("be.visible");
      cy.get('[class="text-left"]').should("contain", src["product 1"].product);
    }
  });
});

describe("Validate the working of 'Shopping Cart' functionality (coupon codes, shipping, gift certificates)", () => {
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
    cy.get('[id="button-cart"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
  });

  it.skip("TC-11: Validate Coupon code functionality in the 'Shopping Cart' page by providing a valid coupon code", () => {
    // Can't find a valid coupon code
  });

  it("TC-12: Validate Coupon code application in the 'Shopping Cart' page by providing an invalid coupon code", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="input-coupon"]').type(spc["coupon codes"]["invalid code"]);
    cy.get('[id="button-coupon"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["coupon codes"].warning)
      .should("be.visible");
  });

  it("TC-13: Validate Coupon code functionality in the 'Shopping Cart' page by providing an valid coupon code which got expired", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="input-coupon"]').type(spc["coupon codes"]["expired code"]);
    cy.get('[id="button-coupon"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["coupon codes"].warning)
      .should("be.visible");
  });

  it("TC-14: Validate Coupon code functionality in the 'Shopping Cart' page by providing an valid coupon code which has reached its usage limit", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="input-coupon"]').type(spc["coupon codes"]["usage limit"]);
    cy.get('[id="button-coupon"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["coupon codes"].warning)
      .should("be.visible");
  });

  it("TC-15: Validate Coupon code functionality in the 'Shopping Cart' page by not providing any coupon code", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="button-coupon"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["coupon codes"]["no coupon warning"])
      .should("be.visible");
  });

  it("TC-16: Validate Closing the Warning message in the 'Shopping Cart' page", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="button-coupon"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["coupon codes"]["no coupon warning"])
      .should("be.visible");
    cy.get('[class="close"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]').should(
      "not.exist"
    );
  });

  it("TC-17: Validate Coupon code functionality in the 'Shopping Cart' page is having Placeholder", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["coupon codes"]["panel title"])
      .click();
    cy.get('[id="input-coupon"]').should(
      "have.attr",
      "placeholder",
      spc["coupon codes"].placeholder
    );
  });

  it("TC-18: Validate Estimate Shipping and Taxes functionality in the 'Shopping Cart' page by providing all mandatory fields", () => {
    const country = "United States";
    const zone = "California";
    cy.get('[class="panel-title"]')
      .contains(spc.shipping["panel title"])
      .click();
    cy.get('[id="input-country"]').select(country);
    cy.get('[id="input-country"]').should("contain.text", country);
    cy.get('[id="input-zone"]').select(zone);
    cy.get('[id="input-zone"]').should("contain.text", zone);
    cy.get('[id="button-quote"]').click();
    cy.get("[class=modal-header]")
      .contains(spc.shipping.method)
      .should("exist")
      .and("be.visible");
    cy.get(".modal-body > p").contains(spc.shipping.rate).should("be.visible");
    cy.get("label > input").should("not.be.checked").check();
    cy.get("[id=button-shipping]").click();
    cy.get(".alert").contains(spc.shipping.success).should("be.visible");
    cy.get('[class="text-right"]').should(
      "contain",
      spc.shipping["total price"]
    );
  });

  it("TC-19: Validate Estimate Shipping and Taxes functionality in the 'Shopping Cart' page by providing all the fields", () => {
    cy.get('[class="panel-title"]')
      .contains(spc.shipping["panel title"])
      .click();
    cy.get('[id="input-country"]').select("223");
    cy.get('[id="input-zone"]').select("3624");
    cy.get('[id="input-postcode"]').type(spc.shipping["post code"]);
    cy.get('[id="button-quote"]').click();
    cy.get("[class=modal-header]")
      .contains(spc.shipping.method)
      .should("exist")
      .and("be.visible");
    cy.get(".modal-body > p").contains(spc.shipping.rate).should("be.visible");
    cy.get("label > input").should("not.be.checked").check();
    cy.get("[id=button-shipping]").click();
    cy.get(".alert").contains(spc.shipping.success).should("be.visible");
    cy.get('[class="text-right"]').should(
      "contain",
      spc.shipping["total price"]
    );
  });

  it("TC-20: Validate Estimate Shipping and Taxes functionality in the 'Shopping Cart' page is not applied on cancelling", () => {
    cy.get('[class="panel-title"]')
      .contains(spc.shipping["panel title"])
      .click();
    cy.get('[id="input-country"]').select("223");
    cy.get('[id="input-zone"]').select("3624");
    cy.get('[id="input-postcode"]').type(spc.shipping["post code"]);
    cy.get('[id="button-quote"]').click();
    cy.get("[class=modal-header]")
      .contains(spc.shipping.method)
      .should("exist")
      .and("be.visible");
    cy.get("p").contains(spc.shipping.rate).should("be.visible");
    cy.get('[name="shipping_method"]').should("not.be.checked");
    cy.get('[class="btn btn-default"]').contains(spc.shipping.cancel).click();
    cy.get('[class="text-right"]').should("contain", spc.page["unit price"]);
  });

  it("TC-21: Validate Estimate Shipping and Taxes functionality in the 'Shopping Cart' page for Placeholder", () => {
    cy.get('[class="panel-title"]')
      .contains(spc.shipping["panel title"])
      .click();
    cy.get('[id="input-postcode"]').should(
      "have.attr",
      "placeholder",
      spc.shipping.placeholder
    );
  });

  it.skip("TC-22: Validate Gift Certificate functionality in the 'Shopping Cart' page by providing a valid Gift Certificate", () => {
    // Can't find a valid gift certificate code
  });

  it("TC-23: Validate Gift Certificate functionality in the 'Shopping Cart' page by providing a invalid Gift Certificate", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["gift certificate"]["panel title"])
      .click();
    cy.get('[id="input-voucher"]').type(
      spc["gift certificate"]["invalid code"]
    );
    cy.get('[id="button-voucher"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["gift certificate"].warning)
      .should("be.visible");
  });

  it("TC-24: Validate Gift Certificate functionality in the 'Shopping Cart' page by providing a used up Gift Certificate", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["gift certificate"]["panel title"])
      .click();
    cy.get('[id="input-voucher"]').type(
      spc["gift certificate"]["used up code"]
    );
    cy.get('[id="button-voucher"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["gift certificate"].warning)
      .should("be.visible");
  });

  it("TC-25: Validate Gift Certificate functionality in the 'Shopping Cart' page by not providing any Gift Certificate", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["gift certificate"]["panel title"])
      .click();
    cy.get('[id="button-voucher"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(spc["gift certificate"]["no code warning"])
      .should("be.visible");
  });

  it("TC-26: Validate Gift Certificate functionality in the 'Shopping Cart' page for Placeholder", () => {
    cy.get('[class="panel-title"]')
      .contains(spc["gift certificate"]["panel title"])
      .click();
    cy.get('[id="input-voucher"]').should(
      "have.attr",
      "placeholder",
      spc["gift certificate"].placeholder
    );
  });

  it("TC-27: Validate Checkout from 'Shopping Cart' page", () => {
    cy.get('[class="btn btn-primary"]').contains(spc.checkout.button).click();
    cy.get("h1").contains(spc.checkout.button).should("be.visible");
  });

  it("TC-28: Continue shopping from the 'Shopping Cart' page", () => {
    cy.get('[class="pull-left"]').contains(spc["contune shopping"]).click();
    cy.get("h3").contains(spc.home).should("be.visible");
  });

  it("TC-29: Validate Breadcrumb, Page Heading, Page Title and Page URL of 'Shopping Cart' page", () => {
    cy.get('[class="breadcrumb"]').should("contain", spc.cart.shopping);
    cy.get("h1").should("contain", spc.added.heading);
    cy.title().should("eq", spc.added.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=checkout/cart"
    );
  });
});
