import * as reg from "../fixtures/TS_001_Register.json";
import {Cryptography} from "../support/cryptography";

describe("Validate the working of Register Account functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
  });

  it("TC-1: Validate Registering an Account by providing only the Mandatory fields", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type('t2045711@gmail.com');
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
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
  });

  it("TC-2: Validate Registering an Account by providing all the fields", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg["TC-2 email"].email2);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
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
  });

  it("TC-3: Validate proper notification messages are displayed for the mandatory fields, when you don't provide any fields in the 'Register Account' page and submit", () => {
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(reg["no or invalid credentials"].warning)
      .should("be.visible");
    cy.get('[class="text-danger"]')
      .eq(0)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nofirstname);
    cy.get('[class="text-danger"]')
      .eq(1)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nolastname);
    cy.get('[class="text-danger"]')
      .eq(2)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].noemail);
    cy.get('[class="text-danger"]')
      .eq(3)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].notel);
    cy.get('[class="text-danger"]')
      .eq(4)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nopass);
  });

  it("TC-4: Validate different ways of navigating to 'Register Account' page", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["navigating register"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(reg["navigating register"].newcustomer)
      .should("be.visible");
    cy.get('[class="btn btn-primary"]')
      .contains(reg["created acc"].continue)
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["navigating register"].login)
      .should("be.visible")
      .click();
    cy.get('[class="list-group"]')
      .should("be.visible")
      .contains(reg["before each"].register)
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
  });

  it("TC-5: Validate Registering an Account by entering different passwords into 'Password' and 'Password Confirm' fields", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg["TC-5 email"].email3);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(reg["different pass"].pass2);
    cy.get('[name="newsletter"]').check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="text-danger"]')
      .contains(reg["different pass"].wrongpass)
      .should("be.visible");
  });

  it("TC-6: Validate Registering an Account by providing the existing account details (i.e. existing email address)", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg.fields.email);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(reg.sameuser.sameemail)
      .should("be.visible");
  });

  it("TC-7: Validate Registering an Account by providing an invalid email address into the E-Mail field", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg.wrongemail.wrongemail);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        `Please include an '@' in the email address. '` +
          reg.wrongemail.wrongemail +
          `' is missing an '@'.`
      );
    });
  });

  it("TC-8: Validate Registering an Account by providing an invalid phone number", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg.wrongtel.email4);
    cy.get('[name="telephone"]').type(reg.wrongtel.wrongtel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="text-danger"]')
      .contains(reg["no or invalid credentials"].notel)
      .should("be.visible");
  });

  it("TC-9: Validate all the fields in the Register Account page have the proper placeholders", () => {
    cy.get('[name="firstname"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.firstname
    );
    cy.get('[name="lastname"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.lastname
    );
    cy.get('[name="email"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.email
    );
    cy.get('[name="telephone"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.tel
    );
    cy.get('[name="password"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.pass
    );
    cy.get('[name="confirm"]').should(
      "have.attr",
      "placeholder",
      reg.placeholders.confirmpass
    );
  });

  it("TC-10: Validate all the mandatory fields in the Register Account page are marked with red color * symbol", () => {
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
  });

  it("TC-11: Validate whether the Mandatory fields in the Register Account page are accepting only spaces", () => {
    cy.get('[name="firstname"]').type("   ");
    cy.get('[name="lastname"]').type("   ");
    cy.get('[name="email"]').type("   ");
    cy.get('[name="telephone"]').type("  ");
    cy.get('[name="password"]').type("   ");
    cy.get('[name="confirm"]').type("   ");
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(reg["no or invalid credentials"].warning)
      .should("be.visible");
    cy.get('[class="text-danger"]')
      .eq(0)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nofirstname);
    cy.get('[class="text-danger"]')
      .eq(1)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nolastname);
    cy.get('[class="text-danger"]')
      .eq(2)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].noemail);
    cy.get('[class="text-danger"]')
      .eq(3)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].notel);
    cy.get('[class="text-danger"]')
      .eq(4)
      .should("be.visible")
      .should("contain", reg["no or invalid credentials"].nopass);
  });

  it("TC-12: Validate whether the leading and trailing spaces entered into the Register Account fields are trimmed", () => {
    // Dosredi
    cy.get('[name="firstname"]').type("  " + reg.fields.firstname + "  ");
    cy.get('[name="lastname"]').type("  " + reg.fields.lastname + "  ");
    cy.get('[name="email"]').type("  " + reg.fields.email4 + "  ");
    cy.get('[name="telephone"]').type("  " + reg.wrongtel + "  ");
    cy.get('[name="password"]').type("  " + Cryptography.decrypt(reg.fields.pass), { log: false } + "  ");
    cy.get('[name="confirm"]').type("  " + Cryptography.decrypt(reg.fields.pass), { log: false } + "  ");
    cy.get('[name="firstname"]').should("have.value", reg.fields.firstname);
    cy.get('[name="lastname"]').should("have.value", reg.fields.lastname);
    cy.get('[name="email"]').should("have.value", reg.fields.email4);
    cy.get('[name="telephone"]').should("have.value", reg.wrongtel);
    cy.get('[name="password"]').should("have.value", Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').should("have.value", Cryptography.decrypt(reg.fields.pass), { log: false });
  });

  it("TC-13: Validate whether the 'Privacy Policy' checkbox option is not selected by default", () => {
    cy.get('[name="agree"]').should("not.be.checked");
  });

  it("TC-14: Validate Registering the Account without selecting the 'Privacy Policy' checkbox option", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg["TC-15 email"].email5);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(reg["no or invalid credentials"].warning)
      .should("be.visible");
  });

  it("TC-15: Validate the Password text entered into the 'Password' and 'Password Confirm' field of 'Register Account' functionality is toggled to hide its visibility", () => {
    cy.get('[name="password"]')
      .type(Cryptography.decrypt(reg.fields.pass), { log: false })
      .should("not.have.attr", "type", Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="confirm"]')
      .type(Cryptography.decrypt(reg.fields.pass), { log: false })
      .should("not.have.attr", "type", Cryptography.decrypt(reg.fields.pass), { log: false });
  });

  it("TC-16: Validate Registring an Account, by filling 'Password' field and not filling 'Password Confirm' field", () => {
    cy.get('[name="firstname"]').type(reg.fields.firstname);
    cy.get('[name="lastname"]').type(reg.fields.lastname);
    cy.get('[name="email"]').type(reg["TC-17 email"].email6);
    cy.get('[name="telephone"]').type(reg.fields.tel);
    cy.get('[name="password"]').type(Cryptography.decrypt(reg.fields.pass), { log: false });
    cy.get('[name="newsletter"]').check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].created)
      .should("not.exist");
    cy.get('[class="text-danger"]')
      .contains(reg["different pass"].wrongpass)
      .should("be.visible");
  });

  it("TC-17: Validate the Breadcrumb, Page Heading, Page URL, Page Title of 'Register Account' Page", () => {
    cy.get('[class="breadcrumb"]').should("contain", reg.breadcrumb.acc);
    cy.get("h1").should("contain", reg["before each"].regacc);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/register"
    );
    cy.title().should("eq", reg["before each"].regacc);
  });
});
