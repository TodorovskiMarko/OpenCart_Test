import * as src from "../fixtures/TS_005_Search.json";
import * as add from "../fixtures/TS_008_Add to Cart.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import * as hmp from "../fixtures/TS_011_Home Page.json";
import { login } from "../support/login";

const threesecwait = 3500;
const twosecwait = 2000;
const onesecwait = 1000;

describe("Validate the working of Home Page functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate navigating to Home Page from 'Shopping Cart' page", () => {
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
    cy.get('[class="pull-left"]').contains(spc["contune shopping"]).click();
  });

  it("TC-2: Validate navigating to Home Page from 'Order Success' page", () => {
    login()
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
    cy.get('[class="btn btn-primary"]').contains(spc.checkout.button).click();
    cy.get("h1").contains(spc.checkout.button).should("be.visible");
    cy.get("[id=button-payment-address]").click();
    cy.get("[id=button-shipping-address]").click();
    cy.get("[id=button-shipping-method]").click();
    cy.get('[type="checkbox"]').check();
    cy.get("[id=button-payment-method]").click();
    cy.get("[id=button-confirm]").click();
    cy.get("h1").contains(hmp.checkout["order success"]);
    cy.get('[class="pull-right"]').contains(hmp.checkout.continue).click();
  });

  it("TC-3: Validate navigating to Home page from any page of the Applcation using Logo", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(add["dropdown menu"].desktop)
      .click();
    cy.get('[class="see-all"]')
      .contains(add["dropdown menu"]["show all"])
      .click();
    cy.get('[title="TheTestingAcademy eCommerce"]')
      .should(
        "have.attr",
        "src",
        "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
      )
      .click();
  });

  it("TC-4: Validate navigating to Home page from any Category Page which don't have any products", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(add["dropdown menu"].desktop)
      .click();
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=product/category&path=20_26"]'
    )
      .contains(hmp["no products category"].category)
      .click();
    cy.get("p")
      .contains(hmp["no products category"].empty)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]').contains(hmp.checkout.continue).click();
  });

  it("TC-5: Validate Hero Images and its slider options in the Home page", () => {
    // Correct Hero Images should be displayed.
    cy.get('[alt="MacBookAir"]')
      .eq(0)
      .should("have.attr", "src", hmp["hero images"]["picture 1"]);
    cy.get('[alt="iPhone 6"]')
      .eq(0)
      .should("have.attr", "src", hmp["hero images"]["picture 2"]);

    // Hero Images should automatically slide
    let currentImageSrc;
    cy.get('[alt="iPhone 6"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((src) => {
        currentImageSrc = src;
      });
    cy.wait(threesecwait);
    cy.get('[alt="MacBookAir"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((newSrc) => {
        expect(newSrc).not.to.equal(currentImageSrc);
      });
    cy.wait(twosecwait);

    //Manually user should be able to slide the Hero Images using < and > options
    cy.get('[class="swiper-button-next"]').eq(0).click();
    cy.get('[alt="MacBookAir"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((src) => {
        currentImageSrc = src;
      });
    cy.wait(500);
    cy.get('[class="swiper-button-prev"]').eq(0).click();
    cy.get('[alt="iPhone 6"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((newSrc) => {
        expect(newSrc).not.to.equal(currentImageSrc);
      });

    // Manually user should be able to slide the Hero Images using Swiper Pagination bullets under the Hero Images
    cy.get('[class="swiper-pagination-bullet"]').eq(0).click();
    cy.get('[alt="iPhone 6"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((src) => {
        currentImageSrc = src;
      });
    cy.get('[class="swiper-pagination-bullet swiper-pagination-bullet-active"]')
      .eq(0)
      .click();
    cy.get('[alt="MacBookAir"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((newSrc) => {
        expect(newSrc).not.to.equal(currentImageSrc);
      });
    cy.wait(twosecwait);

    // User should be able to scroll the images by selecting, holding and sliding the Hero images using mouse
    cy.get('[alt="iPhone 6"]')
      .eq(0)
      .trigger("mousedown", { which: 1, force: true, pageX: 0, pageY: 0 })
      .trigger("mousemove", { force: true, pageX: 100, pageY: 0 })
      .trigger("mouseup", { force: true });
    cy.get('[alt="iPhone 6"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((src) => {
        currentImageSrc = src;
      });
    cy.wait(onesecwait);
    cy.get('[alt="MacBookAir"]')
      .eq(0)
      .should("have.attr", "src", hmp["hero images"]["picture 1"])
      .trigger("mousedown", { which: 1, force: true, pageX: 0, pageY: 0 })
      .trigger("mousemove", { force: true, pageX: -100, pageY: 0 })
      .trigger("mouseup", { force: true });
    cy.get('[alt="MacBookAir"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((newSrc) => {
        expect(newSrc).not.to.equal(currentImageSrc);
      });
  });

  it("TC-6: Validate four featured products should be displayed in the Home Page", () => {
    cy.get(
      '[class="product-layout col-lg-3 col-md-3 col-sm-6 col-xs-12"]'
    ).should("have.length", 4);
  });

  it("TC-7: Validate Partner Carousel section and its slider options in the Home page", () => {
    cy.get('[alt="NFL"]').eq(0).scrollIntoView({ duration: 500 });

    // Correct Logo Images of the partners should be displayed
    cy.get('[alt="NFL"]')
      .eq(0)
      .should("have.attr", "src", hmp.partners["partner 5"]);
    cy.get('[alt="RedBull"]')
      .eq(0)
      .should("have.attr", "src", hmp.partners["partner 1"]);
    cy.get('[alt="Sony"]')
      .eq(0)
      .should("have.attr", "src", hmp.partners["partner 2"]);
    cy.get('[alt="Coca Cola"]')
      .eq(0)
      .should("have.attr", "src", hmp.partners["partner 3"]);
    cy.get('[alt="Burger King"]')
      .eq(0)
      .should("have.attr", "src", hmp.partners["partner 4"]);

    // Logo Images should automatically slide
    let currentImageSrc;
    cy.get('[alt="NFL"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((src) => {
        currentImageSrc = src;
      });
    cy.wait(twosecwait);
    cy.get('[alt="Canon"]')
      .should("be.visible")
      .invoke("attr", "src")
      .then((newSrc) => {
        expect(newSrc).not.to.equal(currentImageSrc);
      });

    // Manually user should be able to slide the Logo Images using < and > options
    cy.get('[class="swiper-button-next"]').eq(1).click();
    cy.get('[alt="Harley Davidson"]').should("be.visible");
    cy.wait(onesecwait);
    cy.get('[class="swiper-button-prev"]').eq(1).click();
    cy.get('[alt="RedBull"]').should("be.visible");

    // Manually user should be able to slide the Logo Images using Swiper Pagination bullets under the Hero Images
    cy.get('[class="swiper-pagination-bullet"]').eq(3).click();
    cy.get('[alt="Dell"]').should("be.visible");

    // User should be able to scroll the Logo images by selecting, holding and sliding the Logo images using mouse
    cy.get('[alt="Coca Cola"]')
      .eq(0)
      .trigger("mousedown", { which: 1, force: true, pageX: 0, pageY: 0 })
      .trigger("mousemove", { force: true, pageX: 50, pageY: 0 })
      .trigger("mouseup", { force: true });
    cy.get('[alt="Sony"]').should("be.visible");
  });

  it("TC-8: Validate navigating to Home Page using 'Home' icon option of the Breadcrumb in different pages of the Application", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(add["dropdown menu"].desktop)
      .click();
    cy.get('[class="see-all"]')
      .contains(add["dropdown menu"]["show all"])
      .click();
    cy.get(".breadcrumb > :nth-child(1)")
      .click();
  });

  afterEach(() => {
    cy.get("h3").contains(spc.home).should("be.visible");
  });
});
