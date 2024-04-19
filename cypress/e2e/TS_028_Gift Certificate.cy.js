import * as gif from "../fixtures/TS_028_Gift Certificate.json";
import * as reg from "../fixtures/TS_001_Register.json";

describe("Validate the working of 'Gift Certificate' page functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[class="list-unstyled"]')
      .contains(gif.link)
      .scrollIntoView({ duration: 600 })
      .click();
    cy.get("h1").contains(gif.heading).should("be.visible");
  });

  it("TC-1: Validate navigating to 'Purchase a Gift Certificate' page", () => {
    // Done in BeforeEach
  });

  it("TC-2: Validate purchasing a Gift Certificate by providing all the mandatory fields", () => {
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
    cy.get('[id="input-to-name"]').type(
      gif["mandatory fields"]["recipients name"]
    );
    cy.get('[id="input-to-email"]').type(
      gif["mandatory fields"]["recipients email"]
    );
    cy.get('[id="input-from-name"]').type(gif["mandatory fields"]["your name"]);
    cy.get('[id="input-from-email"]').type(
      gif["mandatory fields"]["your email"]
    );
    cy.get('[name="voucher_theme_id"]').eq(0).click();
    cy.get('[id="input-amount"]').should("have.value", 1);
    cy.get('[name="agree"]').click();
    cy.get('[type="submit"]').click();

    // Success
    cy.get('[id="content"]')
      .find("p")
      .contains(gif.success)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]').contains(gif.continue).click();

    // Shopping Cart
    cy.get('[class="text-left"]').should(
      "contain.text",
      gif["table text"] + gif["mandatory fields"]["recipients name"]
    );
    cy.get('[class="btn btn-primary"]').contains(gif.checkout).click();

    // Checkout
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[id="button-login"]').click();
    cy.get("[id=button-payment-address]").click();
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();

    // Doesn't give me a payment method to select
  });
});

/* Doesn't give the option to select required payment method on the checkout page,
basically prevents us from buying a gift certificate and blocks the execution of the remainder of the test cases
 REPORT DEFECT !!! */
