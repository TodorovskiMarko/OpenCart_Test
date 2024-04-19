import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import {Cryptography} from "../support/cryptography";

describe("Validate the working of Login functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
  });

  it("TC-1: Validate logging into the Application using valid credentials", () => {
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-2: Validate logging into the Application using invalid credentials (i.e. Invalid email address and Invalid Password)", () => {
    cy.get('[id="input-email"]').type(
      log["invalid credentials"]["invalid email"]
    );
    cy.get('[id="input-password"]').type(
      log["invalid credentials"]["invalid pass"]
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["invalid credentials"].warning)
      .should("be.visible");
  });

  it("TC-3: Validate logging into the Application using invalid email address and valid Password", () => {
    cy.get('[id="input-email"]').type(
      log["invalid credentials"]["invalid email"]
    );
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["invalid credentials"].warning)
      .should("be.visible");
  });

  it("TC-4: Validate logging into the Application using valid email address and invalid Password", () => {
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(
      log["invalid credentials"]["invalid pass"]
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["invalid credentials"].warning)
      .should("be.visible");
  });

  it("TC-5: Validate logging into the Application without providing any credentials", () => {
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["invalid credentials"].warning)
      .should("be.visible");
  });

  it("TC-6: Validate 'Forgotten Password' link is available in the Login page and is working", () => {
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=account/forgotten"]'
    )
      .eq(0)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(log["forgotten password"].heading)
      .should("be.visible");
  });

  it("TC-7: Validate E-Mail Address and Password text fields in the Login page have the placeholder text ", () => {
    cy.get('[id="input-email"]').should(
      "have.attr",
      "placeholder",
      log.placeholders.email
    );
    cy.get('[id="input-password"]').should(
      "have.attr",
      "placeholder",
      log.placeholders.pass
    );
  });

  it("TC-8: Validate Logging into the Application and browsing back using Browser back button", () => {
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.go("back");
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-9: Validate Loggingout from the Application and browsing back using Browser back button", () => {
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log.logout.logout)
      .click();
    cy.go("back");
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
  });

  it("TC-10: Validate the number of unsucessful login attemps", () => {
    cy.get('[id="input-email"]').type(
      log["invalid credentials"]["invalid email"]
    );
    cy.get('[id="input-password"]').type(
      log["invalid credentials"]["invalid pass"]
    );
    for (let i = 0; i < 5; i++) {
      cy.get('[type="submit"]').click();
    }
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["unsucessful login attemps"].warning)
      .should("be.visible");
  });

  it("TC-11: Validate the text into the Password field is toggled to hide its visibility", () => {
    cy.get('[id="input-password"]')
      .type(Cryptography.decrypt(reg.fields.pass), { log: false })
      .should("have.attr", "type", "password");
    cy.get('[id="input-password"]')
      .invoke("val")
      .should("have.length", Cryptography.decrypt(reg.fields.pass), { log: false }.length);
  });

  it("TC-12: Validate Logging into the Application after changing the password", () => {
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]')
      .contains(log["changing password"].change)
      .click();
    cy.get('[id="content"]')
      .contains(log["changing password"].heading)
      .should("be.visible");
    cy.get('[id="input-password"]').type(log["changing password"].newpass);
    cy.get('[id="input-confirm"]').type(log["changing password"].newpass);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(log["changing password"].alert)
      .should("be.visible");
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log.logout.logout)
      .click();
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(log["invalid credentials"].warning)
      .should("be.visible");
    cy.get('[id="input-email"]').clear();
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').clear();
    cy.get('[id="input-password"]').type(log["changing password"].newpass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-13: Validate the different ways of navigating to the Login page", () => {
    cy.get('[class="list-group"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[id="content"]')
      .contains(log["navigating login"].reglog)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[class="list-group"]').contains(log["before each"].login).click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
  });

  it("TC-14: Validate the breadcrumb, Page Heading, Page Title and Page URL of Login page", () => {
    cy.get('[class="breadcrumb"]').should("contain", log["before each"].login);
    cy.get("h2").should("contain", log["before each"].logwin);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/login"
    );
    cy.title().should("eq", log.title.title);
  });
});
