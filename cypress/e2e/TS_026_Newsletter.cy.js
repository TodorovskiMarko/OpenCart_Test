import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as nes from "../fixtures/TS_026_Newsletter.json";
import {Cryptography} from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of 'Newsletter' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login()
  });

  it("TC-1: Validate navigating to 'Newsletter Subscription' page from 'My Account' page", () => {
    cy.get('[class="list-unstyled"]').contains(nes.myacc.news).click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
  });

  it("TC-2: Validate navigating to 'Newsletter Subscription' page using Right Column options", () => {
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
  });

  it("TC-3: Validate navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option after login", () => {
    cy.get('[class="list-unstyled"]')
      .contains(nes["right column link"])
      .scrollIntoView({ duration: 200 })
      .click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
  });

  it("TC-4: Validate 'Back' button in the 'Newsletter Subscription' page", () => {
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.go("back");
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-5: Validate updating the 'Subscribe' option in the 'Newsletter Subscription' page", () => {
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get('[name="newsletter"]').eq(1).should("be.checked");
    cy.get('[name="newsletter"]').eq(0).should("not.be.checked").check();
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(nes["update success"])
      .should("be.visible");
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get('[name="newsletter"]').eq(1).should("not.be.checked");
    cy.get('[name="newsletter"]').eq(0).should("be.checked");
  });

  it("TC-6: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Newsletter Subscription' pag", () => {
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get('[class="breadcrumb"]')
      .should("contain.text", nes.breadcrumb)
      .and("contain.text", nes["right column link"]);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/newsletter"
    );
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
    cy.title().should("eq", nes.myacc.heading);
  });
});

describe("Validate the working of 'Newsletter' functionality (not logged in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-7: Validate navigating to 'Newsletter' page by selecting the option from Right Column options before login", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
  });

  it("TC-8: Validate navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option before login", () => {
    cy.get('[class="list-unstyled"]')
      .contains(nes["right column link"])
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[type="submit"]').click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
  });

  it("TC-9: Register a new Account by opting for 'Newsletter' and check the 'Newsletter Subscription' page", () => {
    // Creating account
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(nes.email);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').eq(0).check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]')
      .contains(reg["created acc"].continue)
      .click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");

    //Checking newsletter
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
    cy.get('[name="newsletter"]').eq(0).should("be.checked");
  });

  it("TC-10: Register a new Account by not opting for 'Newsletter' and check the 'Newsletter Subscription' page", () => {
    // Creating account
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(nes["email 2"]);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').eq(1).check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]')
      .contains(reg["created acc"].continue)
      .click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");

    //Checking newsletter
    cy.get('[class="list-group"]').contains(nes["right column link"]).click();
    cy.get("h1").contains(nes.myacc.heading).should("be.visible");
    cy.get('[name="newsletter"]').eq(1).should("be.checked");
  });
});
