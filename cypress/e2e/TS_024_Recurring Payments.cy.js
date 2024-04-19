import * as reg from "../fixtures/TS_001_Register.json";
import * as rec from "../fixtures/TS_024_Recurring Payments.json";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Recurring Payments' functionality", () => {
  let testNumber = 0;
  beforeEach("TC-2: Validate navigating to 'Recurring Payments' page using Right Column options", () => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    if (testNumber != 0) {
      cy.get('[class="list-group"]').contains(rec.myacc.recpay).click();
      cy.get("h1").contains(rec.myacc.heading).should("be.visible");
    }
  });

  it("TC-1: Validate navigating to 'Recurring Payments' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(rec.myacc.recpay).click();
    cy.get("h1").contains(rec.myacc.heading).should("be.visible");
  });

  it("TC-3: Validate 'Recurring Payments' page when there are no recurring payments done by the User", () => {
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", rec["no payments text"]);
  });

  it("TC-4: Validate 'Continue' button in the 'Recurring Payments' page", () => {
    cy.get('[class="btn btn-primary"]').contains(rec["continue btn"]).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it.skip("TC-5: Validate 'Recurring Payments' page when there are few recurring payments done by the User", () => {
    // Can't be done in demo version
  });

  it("TC-6: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Recurring Payments' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", rec.breadcrumb)
      .and("contain.text", rec.myacc.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/recurring"
    );
    cy.get("h1").contains(rec.myacc.heading).should("be.visible");
    cy.title().should("eq", rec.myacc.heading);
  });
});
