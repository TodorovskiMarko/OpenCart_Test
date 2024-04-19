import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as cap from "../fixtures/TS_015_Change Password.json";
import * as lgt from "../fixtures/TS_003_Logout.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Account > 'Change Password' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
  });

  it("TC-1: Validate navigating to 'Change Password' page from 'My Account' page", () => {
    cy.get('[class="list-unstyled"]').contains(cap.change.btn).click();
  });

  it("TC-2: Validate navigating to 'Change Password' page from 'Site Map' page", () => {
    cy.get('[class="list-unstyled"]')
      .contains(cap["site map"].site)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(cap["site map"].btn).click();
  });

  afterEach(() => {
    cy.get("h1").should("contain.text", cap.change.heading);
  });
});

describe("Validate the working of My Account > 'Change Password' functionality (changing password)", () => {
  beforeEach(
    "TC-3: Validate navigating to 'Change Password' page using 'Password' Right column option",
    () => {
      cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
      cy.get('[title="TheTestingAcademy eCommerce"]').should(
        "have.attr",
        "src",
        "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
      );
      login();
      cy.get('[class="list-group"]').contains(cap["right column"].pass).click();
      cy.get("h1").should("contain.text", cap.change.heading);
    }
  );

  it("TC-4: Validate changing the password without entering anything into the fields in 'Change Password' page", () => {
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]").should(
      "contain.text",
      cap["empty fields"].warning
    );
  });

  it("TC-5: Validate entering different password into the 'Password' and 'Password Confirm' fields while Changing the Password", () => {
    cy.get('[id="input-password"]').type(cap["wrong passwords"].pass);
    cy.get('[id="input-confirm"]').type(cap["wrong passwords"].wrong);
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]").should(
      "contain.text",
      cap["wrong passwords"].warning
    );
  });

  it("TC-6: Validate all the Password fields in the 'Change Password' page are marked as mandatory", () => {
    cy.get('[class="col-sm-2 control-label"]').each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
  });

  it("TC-7: Validate the text entered into the fields in 'Change Password' field is toggled to hide its display", () => {
    cy.get('[id="input-password"]').type(cap["wrong passwords"].pass);

    cy.get('[id="input-password"]')
      .should("have.css", "font-family")
      .and("match", /Open Sans/);

    cy.get('[id="input-confirm"]').type(cap["wrong passwords"].wrong);

    cy.get('[id="input-confirm"]')
      .should("have.css", "font-family")
      .and("match", /Open Sans/);
  });

  it("TC-8: Validate Back button in the 'Change Password' page", () => {
    cy.get('[id="input-password"]').type(cap["wrong passwords"].pass);
    cy.get('[id="input-confirm"]').type(cap["wrong passwords"].wrong);
    cy.go("back");
    cy.get('[class="list-unstyled"]').contains(cap.change.btn).click();
    cy.get('[id="input-password"]').should("have.value", "");
    cy.get('[id="input-confirm"]').should("have.value", "");
  });

  it("TC-9: Validate all the fields in 'Change Password' have placeholders", () => {
    cy.get('[id="input-password"]').should(
      "have.attr",
      "placeholder",
      cap.placeholders.pass
    );
    cy.get('[id="input-confirm"]').should(
      "have.attr",
      "placeholder",
      cap.placeholders.confirm
    );
  });

  it("TC-10: Validate Breadcrumb, Page Heading, Page Title and Page URL in the 'Change Password' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain", cap.breadcrumb.acc)
      .and("contain", cap.change.heading);
    cy.get("h1").should("contain.text", cap.change.heading);
    cy.title().should("eq", cap.change.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/password"
    );
  });

  it("TC-11: Validate changing the password", () => {
    cy.get('[id="input-password"]').type(cap["new pass"].pass);
    cy.get('[id="input-confirm"]').type(cap["new pass"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(cap["new pass"].success)
      .should("be.visible");

    // Login with old password
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(lgt.logout.logout)
      .should("be.visible")
      .click();
    cy.get('[id="content"]').contains(lgt.logout.heading).should("be.visible");
    cy.get('[class="pull-right"]')
      .contains(reg["created acc"].continue)
      .click();
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg["TC-15 email"].email5);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(cap["new pass"].warning)
      .should("be.visible");

    // Login with new password
    cy.get('[id="input-email"]').clear().type(reg["TC-15 email"].email5);
    cy.get('[id="input-password"]').clear().type(cap["new pass"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });
});
