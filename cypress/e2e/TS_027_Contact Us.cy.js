import * as reg from "../fixtures/TS_001_Register.json";
import * as con from "../fixtures/TS_027_Contact Us.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import * as ckt from "../fixtures/TS_012_Checkout.json";
import {Cryptography} from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of 'Contact Us' page functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate navigating to 'Contact Us' page from Header options", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get("h1").contains(con.heading).should("be.visible");
  });

  it("TC-2: Validate navigating to 'Contact Us' page from Footer options", () => {
    cy.get('[class="list-unstyled"]')
      .contains(con.heading)
      .scrollIntoView({ duration: 600 })
      .click();
    cy.get("h1").contains(con.heading).should("be.visible");
  });

  it("TC-3: Validate navigating to 'Contact Us' page from 'Order Success' page", () => {
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
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[id="button-login"]').click();

    // Billing Details
    cy.get("[id=button-payment-address]").click();

    // Delivery Details
    cy.get('[id="button-shipping-address"]').click();

    // Delivery Method
    cy.get('[id="button-shipping-method"]').click();

    // Payment Method
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Confirm Order
    cy.get('[id="button-confirm"]').click();

    // Order Placed
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");
    cy.get('[id="content"]').find("p").contains(con["store owner"]).click();
    cy.get("h1").contains(con.heading).should("be.visible");
  });

  it("TC-4: Validate whether the required details and fields are displayed in the 'Contact Us' page", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get("h1").contains(con.heading).should("be.visible");
    cy.get("address").should("be.visible");
    cy.get("strong:contains('" + con.tel + "')")
      .parent()
      .find("br")
      .eq(0)
      .should("not.have.value", null);
    cy.get('[class="form-group required"]').should(($div) => {
      const text = $div.text().replace(/\s+/g, " ").trim();
      const expectedText = [
        con["contact forms"].name,
        con["contact forms"].email,
        con["contact forms"].enquiry,
      ].join(" ");
      expect(text).to.contain(expectedText);
    });
  });

  it("TC-5: Validate all the text fields in the 'Contact Us' page are mandatory", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
  });

  it("TC-6: Validate submitting the 'Contact Form' in 'Contact Us' page by providing all the details", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get('[id="input-name"]').type(reg.fields.firstname);
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-enquiry"]').type(con.enquiry);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .find("p")
      .contains(con.success)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]').contains(con.continue).click();
    cy.get('[class="slideshow swiper-viewport"]').should("be.visible");
  });

  it("TC-7: Validate submitting the 'Contact Form' in 'Contact Us' page by not providing any details", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get('[type="submit"]').click();
    const expectedSentences = [
      con["empty fields warnings"].name,
      con["empty fields warnings"].email,
      con["empty fields warnings"].enquiry,
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

  it("TC-8: Validate entering invalid email address into the 'E-Mail Address' field and submit the form", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get('[id="input-name"]').type(reg.fields.firstname);
    cy.get('[id="input-email"]').type(con["invalid email"]);
    cy.get('[id="input-enquiry"]').type(con.enquiry);
    cy.get('[type="submit"]').click();
    cy.get('[class="text-danger"]').should(
      "contain.text",
      con["empty fields warnings"].email
    );
  });

  it("TC-9: Validate submitting the 'Contact Form' in 'Contact Us' page by providing all the details after login", () => {
    login()
    cy.get('[class="fa fa-phone"]').click();

    cy.get('[id="input-name"]').should("have.value", reg.fields.firstname);
    cy.get('[id="input-email"]').should("have.value", reg.fields.email);
    cy.get('[id="input-enquiry"]').type(con.enquiry);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]').find("p").contains(con.success);
    cy.get('[class="btn btn-primary"]').contains(con.continue).click();
    cy.get('[class="slideshow swiper-viewport"]').should("be.visible");
  });

  it("TC-10: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Contact Us' page", () => {
    cy.get('[class="fa fa-phone"]').click();
    cy.get('[class="breadcrumb"]').should("contain.text", con.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=information/contact"
    );
    cy.get("h1").contains(con.heading).should("be.visible");
    cy.title().should("eq", con.heading);
  });
});
