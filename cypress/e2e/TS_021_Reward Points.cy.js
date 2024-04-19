import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as rew from "../fixtures/TS_021_Reward Points.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Reward Points' functionality", () => {
  let testNumber = 0;
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    if (testNumber != 2) {
      login();
    }
  });

  it("TC-1: Validate navigating to 'Your Reward Points' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(rew.myacc.reward).click();
  });

  it("TC-2: Validate navigating to 'Your Reward Points' page from Right Column options", () => {
    testNumber = 2;
    cy.get('[class="list-group"]').contains(rew["right column"]).click();
  });

  it("TC-3: Validate navigating to 'Your Reward Points' page by selecting the option from Right Column options before login", () => {
    testNumber = 3;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[class="list-group"]').contains(rew["right column"]).click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
  });

  afterEach(() => {
    cy.get("h1").contains(rew.myacc.heading).should("be.visible");
  });
});

describe("Validate the working of My Orders > 'Reward Points' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-group"]').contains(rew["right column"]).click();
    cy.get("h1").contains(rew.myacc.heading).should("be.visible");
  });

  it("TC-4: Validate 'Your Reward Points' page when there are no reward points", () => {
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", rew["no points"].text);
    cy.get('[class="text-center"]').should(
      "contain.text",
      rew["no points"].table
    );
  });

  it("TC-5: Validate 'Continue' button in the 'Your Reward Points' page", () => {
    cy.get('[class="pull-right"]').contains(rew.continue).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it.skip("TC-6: Validate User purchases the products having reward points and checks the 'Your Reward Points' page for details", () => {
    // Can't purchase in the demo version
  });

  it("TC-7: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Your Reward Points' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", rew.breadcrumb)
      .and("contain.text", rew["right column"]);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/reward"
    );
    cy.get("h1").contains(rew.myacc.heading).should("be.visible");
    cy.title().should("eq", rew.myacc.heading);
  });
});
