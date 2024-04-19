import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as tra from "../fixtures/TS_023_Transactions.json";
import {Cryptography} from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Your Transactions' functionality", () => {
  let testNumber = 0;
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    if (testNumber != 3) {
      login()
    }
  });

  it("TC-1: Validate navigating to 'Your Transactions' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(tra.myacc.tran).click();
  });

  it("TC-2: Validate navigating to 'Your Transactions' page from 'My Account' Dropmenu", () => {
    testNumber = 2;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(tra.dropdown)
      .should("be.visible")
      .click();
  });

  it("TC-3: Validate navigating to 'Your Transactions' page using Right Column options", () => {
    testNumber = 3;
    cy.get('[class="list-group"]').contains(tra.dropdown).click();
  });

  it("TC-4: Validate navigating to 'Your Transactions' page by selecting the option from Right Column options before login", () => {
    testNumber = 4;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[class="list-group"]').contains(tra.dropdown).click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
  });

  afterEach(() => {
    cy.get("h1").contains(tra.myacc.tran).should("be.visible");
  });
});

describe("Validate the working of My Orders > 'Your Transactions' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
   login()
    cy.get('[class="list-group"]').contains(tra.dropdown).click();
    cy.get("h1").contains(tra.myacc.tran).should("be.visible");
  });

  it("TC-5: Validate 'Your Transactions' page when the User has not placed any orders or the payments for the order made is not completed ", () => {
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", tra["no transcations"].balance);
    cy.get('[class="text-center"]').should(
      "contain.text",
      tra["no transcations"].text
    );
  });

  it("TC-6: Validate 'Continue' button in the 'Your Transactions' page", () => {
    cy.get('[class="btn btn-primary"]').contains(tra["continue btn"]).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it.skip("TC-7: Validate 'Your Transactions' page when the User has placed few orders and have completed the payment for the orders placed", () => {
    // Can't make transactions in the demo version
  });

  it("TC-8: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Your Transactions' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", tra.breadcrumb)
      .and("contain.text", tra.myacc.tran);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/transaction"
    );
    cy.get("h1").contains(tra.myacc.tran).should("be.visible");
    cy.title().should("eq", tra.myacc.tran);
  });
});
