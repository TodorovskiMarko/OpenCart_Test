import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as dow from "../fixtures/TS_020_Downloads.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Downloads' functionality", () => {
  let testNumber = 0;
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    if (testNumber != 4) {
      login();
    }
  });

  it("TC-1: Validate navigating to 'Account Downloads' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(dow.myacc.downloads).click();
  });

  it("TC-2: Validate navigating to 'Account Downloads' page from 'My Account' dropmenu", () => {
    testNumber = 2;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(dow.myacc.downloads)
      .should("be.visible")
      .click();
  });

  it("TC-3: Validate navigating to 'Account Downloads' page using 'Downloads' Right Column option", () => {
    testNumber = 3;
    cy.get('[class="list-group"]').contains(dow.myacc.downloads).click();
  });

  it("TC-4: Validate navigating to 'Account Downloads' page from 'Site Map' page", () => {
    testNumber = 4;
    cy.get('[class="list-unstyled"]')
      .contains(dow["site map"])
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(dow.myacc.downloads).click();
  });

  it("TC-5: Validate navigating to 'Account Downloads' page from Right Column options before logging into the Application", () => {
    testNumber = 5;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[class="list-group"]').contains(dow.myacc.downloads).click();
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
    cy.get("h2").contains(dow.myacc.heading).should("be.visible");
  });
});

describe("Validate the working of My Orders > 'Downloads' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-group"]').contains(dow.myacc.downloads).click();
    cy.get("h2").contains(dow.myacc.heading).should("be.visible");
  });

  it("TC-6: Validate 'Account Downloads' page where the User has not placed any downloadable orders", () => {
    cy.get('[id="content"]')
      .find("p")
      .contains(dow["no downloads text"])
      .should("be.visible");
  });

  it("TC-7: Validate 'Continue' button on the 'Account Downloads' page", () => {
    cy.get('[class="pull-right"]').contains(dow["continue btn"]).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it.skip("TC-8: Validate 'Account Downloads' page where the User has placed few Downloadable orders", () => {
    // Not available in demo
  });

  it.skip("TC-9: Validate user is taken to 'Order Information' page from 'Account Downloads' page", () => {
    // Don't have downloadable orders
  });

  it("TC-10: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Account Downloads' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", dow.breadcrumb)
      .and("contain.text", dow.myacc.downloads);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/download"
    );
    cy.get("h2").contains(dow.myacc.heading).should("be.visible");
    cy.title().should("eq", dow.myacc.heading);
  });
});
