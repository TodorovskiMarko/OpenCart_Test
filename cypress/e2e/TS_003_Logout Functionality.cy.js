import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as lgt from "../fixtures/TS_003_Logout.json";
import { login } from "../support/login";
import { Cryptography } from "../support/cryptography";

describe("Validate the working of Logout functionality (without being logged in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate Logout option is not displayed under 'My Account' menu before logging in", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]').should(
      "not.contain",
      lgt.logout.logout
    );
  });

  it("TC-2: Validate Logout option is not displayed under 'Right Column' options before logging in", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
    cy.get('[id="column-right"]').should("not.contain", lgt.logout.logout);
  });

  describe("Validate the working of Logout functionality (already logged in)", () => {
    beforeEach(() => {
      cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
      cy.get('[title="TheTestingAcademy eCommerce"]').should(
        "have.attr",
        "src",
        "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
      );
      login();
    });

    it("TC-3: Validate Logging out by selecting Logout option from 'My Account' dropmenu", () => {
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]')
        .contains(lgt.logout.logout)
        .should("be.visible")
        .click();
      cy.get('[id="content"]')
        .contains(lgt.logout.heading)
        .should("be.visible");
      cy.get('[class="pull-right"]')
        .contains(reg["created acc"].continue)
        .click();
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]').should(
        "not.contain",
        lgt.logout.logout
      );
    });

    it("TC-4: Validate Logging out by selecting Logout option from 'Right Column' options", () => {
      cy.get('[class="list-group"]')
        .contains(lgt.logout.logout)
        .should("be.visible")
        .click();
      cy.get('[id="content"]')
        .contains(lgt.logout.heading)
        .should("be.visible");
      cy.get('[class="pull-right"]')
        .contains(reg["created acc"].continue)
        .click();
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]').should(
        "not.contain",
        lgt.logout.logout
      );
    });

    it("TC-5: Validate logging out and browsing back", () => {
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]')
        .contains(lgt.logout.logout)
        .should("be.visible")
        .click();
      cy.get('[id="content"]')
        .contains(lgt.logout.heading)
        .should("be.visible");
      cy.get('[class="pull-right"]')
        .contains(reg["created acc"].continue)
        .click();
      cy.go("back");
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]').should(
        "not.contain",
        lgt.logout.logout
      );
    });

    it("TC-6: Validate logging out and loggin in immediately after logout", () => {
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]')
        .contains(lgt.logout.logout)
        .should("be.visible")
        .click();
      cy.get('[id="content"]')
        .contains(lgt.logout.heading)
        .should("be.visible");
      cy.get('[class="pull-right"]')
        .contains(reg["created acc"].continue)
        .click();
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]').should(
        "not.contain",
        lgt.logout.logout
      );
      cy.get('[title="My Account"]');
      cy.get('[class="dropdown-menu dropdown-menu-right"]')
        .contains(log["before each"].login)
        .should("be.visible")
        .click();
      cy.get('[class="well"]')
        .contains(log["before each"].logwin)
        .should("be.visible");
      cy.get('[id="input-email"]').type(reg.fields.email);
      cy.get('[id="input-password"]').type(
        Cryptography.decrypt(reg.fields.pass),
        { log: false }
      );
      cy.get('[type="submit"]').click();
      cy.get('[id="content"]')
        .contains(reg["created acc"].myacc)
        .should("be.visible");
    });

    it("TC-7: Validate the breadcrumb, Page Heading, Page Title and Page URL of Logout page", () => {
      cy.get('[title="My Account"]').click();
      cy.get('[class="dropdown-menu dropdown-menu-right"]')
        .contains(lgt.logout.logout)
        .should("be.visible")
        .click();
      cy.get('[class="breadcrumb"]').should("contain", lgt.logout.logout);
      cy.get("h1").should("contain", lgt.logout.heading);
      cy.url().should(
        "eq",
        "https://awesomeqa.com/ui/index.php?route=account/logout"
      );
      cy.title().should("eq", lgt.logout.heading);
    });
  });
});
