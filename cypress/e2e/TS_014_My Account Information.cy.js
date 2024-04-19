import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as mai from "../fixtures/TS_014_My Account Information.json";
import * as lgt from "../fixtures/TS_003_Logout.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Account > Account Information functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-unstyled"]').contains(mai.edit.btn).click();
    cy.get("h1").should("contain.text", mai.edit.heading).and("be.visible");
  });

  it("TC-1: Validate navigating to 'My Account Information' page from 'My Account' page", () => {
    // Done in BeforeEach
  });

  it("TC-2: Validate navigating to 'My Account Information' page using 'Edit Account' Right column option", () => {
    cy.get('[class="list-group"]').contains(mai["right column"].edit).click();
    cy.get("h1").should("contain.text", mai.edit.heading).and("be.visible");
  });

  it("TC-3: Validate navigating to 'My Account Information' page from 'Site Map' page", () => {
    cy.get('[class="list-unstyled"]')
      .contains("Site Map")
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(mai["site map"].btn).click();
    cy.get("h1").should("contain.text", mai.edit.heading).and("be.visible");
  });

  it("TC-4: Validate updating the Account Details in the 'My Account Information' page", () => {
    // Loggin with a different email
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(lgt.logout.logout)
      .should("be.visible")
      .click();
    cy.get('[id="content"]').contains(lgt.logout.heading).should("be.visible");
    cy.get('[class="pull-right"]')
      .contains(reg["created acc"].continue)
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg["TC-2 email"].email2);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(mai.edit.btn).click();
    cy.get("h1").should("contain.text", mai.edit.heading).and("be.visible");

    // Update
    cy.get('[id="input-firstname"]').clear().type(mai.update.firstname);
    cy.get('[id="input-lastname"]').clear().type(mai.update.lastname);
    cy.get('[id="input-email"]').clear().type(mai.update.email);
    cy.get('[id="input-telephone"]').clear().type(mai.update.tel);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(mai.update.success)
      .should("be.visible");

    // Logout
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(lgt.logout.logout)
      .should("be.visible")
      .click();
    cy.get('[id="content"]').contains(lgt.logout.heading).should("be.visible");
    cy.get('[class="pull-right"]')
      .contains(reg["created acc"].continue)
      .click();

    // Login
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(mai.update.email);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");

    // Logout
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(lgt.logout.logout)
      .should("be.visible")
      .click();
    cy.get('[id="content"]').contains(lgt.logout.heading).should("be.visible");
    cy.get('[class="pull-right"]')
      .contains(reg["created acc"].continue)
      .click();

    // Login with old email
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
    cy.get('[id="input-email"]').type(reg["TC-2 email"].email2);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]').should("not.contain", reg["created acc"].myacc);
    cy.get(".alert").contains(mai.update.warning).should("be.visible");
  });

  it("TC-5: Validate making all the fields in the 'My Account Information' page empty and update", () => {
    cy.get('[id="input-firstname"]').clear();
    cy.get('[id="input-lastname"]').clear();
    cy.get('[id="input-email"]').clear();
    cy.get('[id="input-telephone"]').clear();
    cy.get('[type="submit"]').click();

    const expectedSentences = [
      mai["empty field warnings"].firstname,
      mai["empty field warnings"].lastname,
      mai["empty field warnings"].email,
      mai["empty field warnings"].tel,
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

  it("TC-6: Validate all the fields in the 'My Account Information page have placeholders", () => {
    cy.get('[id="input-firstname"]').should(
      "have.attr",
      "placeholder",
      mai.placeholders.firstname
    );
    cy.get('[id="input-lastname"]').should(
      "have.attr",
      "placeholder",
      mai.placeholders.lastname
    );
    cy.get('[id="input-email"]').should(
      "have.attr",
      "placeholder",
      mai.placeholders.email
    );
    cy.get('[id="input-telephone"]').should(
      "have.attr",
      "placeholder",
      mai.placeholders.tel
    );
  });

  it("TC-7: Validate all the fields in the 'My Account Information page are marked as mandatory", () => {
    cy.get('[class="col-sm-2 control-label"]').each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
  });

  it("TC-8: Validate providing invalid email format into the 'E-Mail' Address field", () => {
    cy.get('[id="input-firstname"]').clear().type(mai.update.firstname);
    cy.get('[id="input-lastname"]').clear().type(mai.update.lastname);
    cy.get('[id="input-email"]').clear().type(mai.update["invalid email"]);
    cy.get('[id="input-telephone"]').clear().type(mai.update.tel);
    cy.get('[type="submit"]').click();
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        `Please include an '@' in the email address. '` +
          mai.update["invalid email"] +
          `' is missing an '@'.`
      );
    });

    cy.get('[id="input-email"]').clear().type(mai.update["invalid email 2"]);
    cy.get('[type="submit"]').click();
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        `Please enter a part following '@'. '` +
          mai.update["invalid email 2"] +
          `' is incomplete.`
      );
    });

    cy.get('[id="input-email"]').clear().type(mai.update["invalid email 3"]);
    cy.get('[type="submit"]').click();
    cy.get('[class="text-danger"]')
      .contains(mai["empty field warnings"].email)
      .should("be.visible");

    cy.get('[id="input-email"]').clear().type(mai.update["invalid email 4"]);
    cy.get('[type="submit"]').click();
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        `'.' is used at a wrong position in 'gmail.'.`
      );
    });
  });

  it.skip("TC-9: Verify Back button in the 'My Acccount Information' page", () => {
    cy.get('[id="input-firstname"]').clear().type(mai.update.firstname);
    cy.get('[id="input-lastname"]').clear().type(mai.update.lastname);
    cy.get('[id="input-email"]').clear().type(mai.update.email);
    cy.get('[id="input-telephone"]').clear().type(mai.update.tel);
    cy.go("back");
    cy.get('[class="list-unstyled"]').contains(mai.edit.btn).click();
    cy.get('[id="input-firstname"]').should("have.value", null);
    cy.get('[id="input-lastname"]').should("have.value", null);
    cy.get('[id="input-email"]').should("have.value", null);
    cy.get('[id="input-telephone"]').should("have.value", null);

    //Updated details are not lost - Report Defect!
  });

  it("TC-10: Validate Breadcrumb, Page Heading, Page Title and Page URL in the 'My Account Information' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain", mai.breadcrumbs.acc)
      .and("contain", mai.breadcrumbs.edit);
    cy.get("h1").should("contain.text", mai.edit.heading).and("be.visible");
    cy.title().should("eq", mai.edit.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/edit"
    );
  });
});
