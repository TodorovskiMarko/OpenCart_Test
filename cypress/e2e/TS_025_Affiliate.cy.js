import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as aff from "../fixtures/TS_025_Affiliate.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of 'Affiliate' functionality (creating account already logged in)", () => {
  let skipAfterEach = false;
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
  });

  it("TC-1: Validate registering for an affiliate account as a signedin user by providing only the mandatory details", () => {
    cy.get('[id="input-email"]').type(reg["TC-17 email"].email6);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get('[id="input-cheque"]').type(aff.register["payee name"]);

    // Check that the field is mandatory (red star symbol)
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
  });

  it("TC-2: Validate registering for an affiliate account as a signedin user by providing all the details", () => {
    cy.get('[id="input-email"]').type(aff["acc 1"].email);
    cy.get('[id="input-password"]').type(aff["acc 1"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get('[id="input-company"]').type(aff["all fields"].company);
    cy.get('[id="input-website"]').type(aff["all fields"].website);
    cy.get('[id="input-tax"]').type(aff["all fields"]["tax id"]);
    cy.get('[id="input-cheque"]').type(aff.register["payee name"]);

    // Check that the field is mandatory (red star symbol)
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
  });

  it("TC-3: Validate registering for an affiliate account as a signedin user by selecting the payment method as Paypal", () => {
    cy.get('[id="input-email"]').type(aff["acc 2"].email);
    cy.get('[id="input-password"]').type(aff["acc 2"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get('[id="input-company"]').type(aff["all fields"].company);
    cy.get('[id="input-website"]').type(aff["all fields"].website);
    cy.get('[id="input-tax"]').type(aff["all fields"]["tax id"]);
    cy.get('[name="payment"]').eq(1).check();
    cy.get('[id="input-paypal"]').type(aff["acc 2"].email);

    // Check that the field is mandatory (red star symbol)
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
  });

  it("TC-4: Validate registering for an affiliate account as a signedin user by selecting the payment method as Bank Transfer", () => {
    cy.get('[id="input-email"]').type(aff["acc 3"].email);
    cy.get('[id="input-password"]').type(aff["acc 3"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get('[id="input-company"]').type(aff["all fields"].company);
    cy.get('[id="input-website"]').type(aff["all fields"].website);
    cy.get('[id="input-tax"]').type(aff["all fields"]["tax id"]);
    cy.get('[name="payment"]').eq(2).check();
    cy.get('[id="input-bank-name"]').type(aff["acc 3"]["bank name"]);
    cy.get('[id="input-bank-branch-number"]').type(aff["acc 3"]["ABA number"]);
    cy.get('[id="input-bank-swift-code"]').type(aff["acc 3"]["SWIFT code"]);
    cy.get('[id="input-bank-account-name"]').type(aff.register["payee name"]);
    cy.get('[id="input-bank-account-number"]').type(aff["acc 3"]["acc number"]);

    // Check that the field is mandatory (red star symbol)
    cy.get(".required .control-label").each(($el) => {
      cy.wrap($el).then(($el) => {
        const requiredStar = window.getComputedStyle($el[0], "::before");
        const starColor = requiredStar.getPropertyValue("color");

        expect(starColor).to.equal("rgb(255, 0, 0)");
      });
    });
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
  });

  it("TC-5: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Affiliate Information' page", () => {
    skipAfterEach = true;
    cy.get('[id="input-email"]').type(aff["acc 5"].email);
    cy.get('[id="input-password"]').type(aff["acc 5"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get('[class="breadcrumb"]')
      .should("contain.text", aff.tracking.breadcrumbs.acc)
      .and("contain.text", aff.footer.link);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/affiliate/add"
    );
    cy.title().should("eq", aff.register.heading);
  });

  afterEach(() => {
    if (!skipAfterEach) {
      // Successful creation
      cy.get('[class="alert alert-success alert-dismissible"]')
        .contains(aff.register.success)
        .should("be.visible");
      cy.get('[id="content"]')
        .contains(reg["created acc"].myacc)
        .should("be.visible");
      cy.get('[class="list-unstyled"]')
        .contains(aff.register.affiliate)
        .should("not.exist");
    }
  });
});

describe("Validate the working of 'Affiliate' functionality (warnings)", () => {
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
    cy.get('[id="input-email"]').type(aff["acc 4"].email);
    cy.get('[id="input-password"]').type(aff["acc 4"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-unstyled"]').contains(aff.register.affiliate).click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
  });

  it("TC-6: Validate registering for an affiliate account as a signedin user by selecting the payment method as Paypal by providing invalid email address format", () => {
    cy.get('[id="input-company"]').type(aff["all fields"].company);
    cy.get('[id="input-website"]').type(aff["all fields"].website);
    cy.get('[id="input-tax"]').type(aff["all fields"]["tax id"]);
    cy.get('[name="payment"]').eq(1).check();
    cy.get('[id="input-paypal"]').type(aff["invalid email"].email);
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .should("contain.text", aff["invalid email"].warning)
      .and("be.visible");
  });

  it("TC-7: Validate mandatory fields while registering for an affiliate account as a signedin user by selecting the payment method as Cheque", () => {
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .should("contain.text", aff["cheque empty field warning"])
      .and("be.visible");
  });

  it("TC-8: Validate mandatory fields while registering for an affiliate account as a signedin user by selecting the payment method as PayPal", () => {
    cy.get('[name="payment"]').eq(1).check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .should("contain.text", aff["paypal empty field warning"])
      .and("be.visible");
  });

  it("TC-9: Validate mandatory fields while registering for an affiliate account as a signedin user by selecting the payment method as Bank Transfer", () => {
    cy.get('[name="payment"]').eq(2).check();
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    const expectedSentences = [
      aff["bank transfer field"]["acc name warning"],
      aff["bank transfer field"]["acc number required"],
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
});

describe("Validate the working of 'Affiliate' functionality (not logged in)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[class="list-unstyled"]')
      .contains(aff.footer.link)
      .scrollIntoView({ duration: 700 })
      .click();
    cy.get("h1").contains(aff.footer.heading).should("be.visible");
  });

  it("TC-10: Validate directly regestering a New Affiliate account by filling only the mandatory fields", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[id="input-firstname"]').type(
      aff["manadatory details (affilliate program)"].firstname
    );
    cy.get('[id="input-lastname"]').type(
      aff["manadatory details (affilliate program)"].lastname
    );
    cy.get('[id="input-email"]').type(
      aff["manadatory details (affilliate program)"].email
    );
    cy.get('[id="input-telephone"]').type(
      aff["manadatory details (affilliate program)"].tel
    );
    cy.get('[id="input-cheque"]').type(
      aff["manadatory details (affilliate program)"]["cheque payee name"]
    );
    cy.get('[id="input-password"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[id="input-confirm"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    cy.get("h1")
      .contains(aff["manadatory details (affilliate program)"].success)
      .should("be.visible");
    cy.get('[class="list-group"]').contains(aff.myacc).click();

    cy.get('[class="list-unstyled"]')
      .contains(aff.register.affiliate)
      .should("not.exist");
    cy.get('[class="list-unstyled"]')
      .should("contain", aff["my affiliate account"].edit)
      .and("contain", aff["my affiliate account"].custom);
  });

  it("TC-11: Validate directly regestering a New Affiliate account by filling all the fields", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[id="input-firstname"]').type(
      aff["manadatory details (affilliate program)"].firstname
    );
    cy.get('[id="input-lastname"]').type(
      aff["manadatory details (affilliate program)"].lastname
    );
    cy.get('[id="input-email"]').type(aff["all fields email"]);
    cy.get('[id="input-telephone"]').type(
      aff["manadatory details (affilliate program)"].tel
    );
    cy.get('[id="input-company"]').type(aff["all fields"].company);
    cy.get('[id="input-website"]').type(aff["all fields"].website);
    cy.get('[id="input-tax"]').type(aff["all fields"]["tax id"]);
    cy.get('[id="input-cheque"]').type(
      aff["manadatory details (affilliate program)"]["cheque payee name"]
    );
    cy.get('[id="input-password"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[id="input-confirm"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    cy.get("h1")
      .contains(aff["manadatory details (affilliate program)"].success)
      .should("be.visible");
    cy.get('[class="list-group"]').contains(aff.myacc).click();

    cy.get('[class="list-unstyled"]')
      .contains(aff.register.affiliate)
      .should("not.exist");
    cy.get('[class="list-unstyled"]')
      .should("contain", aff["my affiliate account"].edit)
      .and("contain", aff["my affiliate account"].custom);
  });

  it("TC-12: Validate registering a duplicate affiliate account", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[id="input-firstname"]').type(
      aff["manadatory details (affilliate program)"].firstname
    );
    cy.get('[id="input-lastname"]').type(
      aff["manadatory details (affilliate program)"].lastname
    );
    cy.get('[id="input-email"]').type(
      aff["manadatory details (affilliate program)"].email
    );
    cy.get('[id="input-telephone"]').type(
      aff["manadatory details (affilliate program)"].tel
    );
    cy.get('[id="input-cheque"]').type(
      aff["manadatory details (affilliate program)"]["cheque payee name"]
    );
    cy.get('[id="input-password"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[id="input-confirm"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    cy.get('[class="alert alert-danger alert-dismissible"]')
      .contains(aff["duplicate acc alert"])
      .should("be.visible");
  });

  it("TC-13: Validate registering a new affiliate account by providing invalid email format", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[id="input-firstname"]').type(
      aff["manadatory details (affilliate program)"].firstname
    );
    cy.get('[id="input-lastname"]').type(
      aff["manadatory details (affilliate program)"].lastname
    );
    cy.get('[id="input-email"]').type(aff["invalid email"].email);
    cy.get('[id="input-telephone"]').type(
      aff["manadatory details (affilliate program)"].tel
    );
    cy.get('[id="input-cheque"]').type(
      aff["manadatory details (affilliate program)"]["cheque payee name"]
    );
    cy.get('[id="input-password"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[id="input-confirm"]').type(
      aff["manadatory details (affilliate program)"].pass
    );
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    cy.get('[class="text-danger"]')
      .contains(aff["invalid email"]["register warning"])
      .should("be.visible");
  });

  it("TC-14: Validate registering a new affiliate account by providing different passwords into the 'Password' and 'Password Confirm' fields", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[id="input-firstname"]').type(
      aff["manadatory details (affilliate program)"].firstname
    );
    cy.get('[id="input-lastname"]').type(
      aff["manadatory details (affilliate program)"].lastname
    );
    cy.get('[id="input-email"]').type(aff["different pass"].email);
    cy.get('[id="input-telephone"]').type(
      aff["manadatory details (affilliate program)"].tel
    );
    cy.get('[id="input-cheque"]').type(
      aff["manadatory details (affilliate program)"]["cheque payee name"]
    );
    cy.get('[id="input-password"]').type(aff["different pass"].pass);
    cy.get('[id="input-confirm"]').type(aff["different pass"]["diff pass"]);
    cy.get('[name="agree"]').check();
    cy.get('[type="submit"]').click();

    cy.get('[class="text-danger"]')
      .contains(aff["different pass"].warning)
      .should("be.visible");
  });

  it("TC-15: Validate 'login page' link in the displayed 'Affiliate Program'", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=affiliate/login"]')
      .contains(aff.login)
      .click();
    cy.get("h1").contains(aff.footer.heading).should("be.visible");
  });

  it("TC-16: Validate 'About Us' link in the 'Affiliate Program' page", () => {
    cy.get('[class="btn btn-primary"]').eq(0).click();
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=affiliate/register"
    );
    cy.get('[class="pull-right"]').find("b").contains(aff.about).click();
    cy.get('[class="modal-title"]')
      .contains(aff.about)
      .should("exist")
      .and("be.visible");
    cy.get('[class="close"]').click();
    cy.get('[class="modal-title"]')
      .contains(aff.about)
      .should("not.be.visible");
  });

  it("TC-17: Validate Logging into the Application as a User who has not yet registered as Affiliate", () => {
    cy.get('[id="input-email"]').type(aff["not registered"].email);
    cy.get('[id="input-password"]').type(aff["not registered"].pass);
    cy.get('[type="submit"]').click();

    // User is taken to the 'My Account' page,
    // user should not be allowed to login as the Affiliate account doesn't exists for this User - Report Defect!
  });

  it("TC-18: Validate Logging into the Application as a User who has registered as Affiliate", () => {
    cy.get('[id="input-email"]').type(aff["acc 1"].email);
    cy.get('[id="input-password"]').type(aff["acc 1"].pass);
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });
});

describe("Validate the working of 'Affiliate' functionality (misc)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
  });

  it("TC-19: Validate selecting the 'Affiliate' footer link when the User is already loggedin", () => {
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=affiliate/login"]')
      .contains(aff.footer.link)
      .scrollIntoView({ duration: 700 })
      .click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-20: Validate editing the earlier registered Affiliate information", () => {
    cy.get('[class="list-unstyled"]')
      .contains(aff["my affiliate account"].edit)
      .click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("h1").should("contain", aff.register.heading).and("be.visible");
    cy.get('[id="input-company"]').clear().type(aff["all fields"].company);
    cy.get('[id="input-website"]').clear().type(aff["all fields"].website);
    cy.get('[id="input-tax"]').clear().type(aff["all fields"]["tax id"]);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(aff.register.success)
      .should("be.visible");
  });

  it("TC-21: Validate generating the Affiliate Tracking link", () => {
    cy.get('[class="list-unstyled"]')
      .contains(aff["my affiliate account"].custom)
      .click();
    cy.get("h1").contains(aff.tracking.heading).should("be.visible");
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", aff.tracking.text);
    cy.get('[id="input-code"]').should("not.have.value", null);
    cy.get('[id="input-generator"]').click();
    cy.get('[class="dropdown-menu"]').contains(aff.tracking.product).click();
    cy.get('[id="input-link"]').should("not.have.value", null);

    cy.get('[id="input-link"]')
      .invoke("val")
      .then((url) => {
        cy.visit(url);
        cy.url().should("eq", url);
      });
    cy.get("h1").contains(aff.tracking.product).should("be.visible");
  });

  it("TC-22: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Affiliate Tracking' page", () => {
    cy.get('[class="list-unstyled"]')
      .contains(aff["my affiliate account"].custom)
      .click();
    cy.get('[class="breadcrumb"]')
      .should("contain.text", aff.tracking.breadcrumbs.acc)
      .and("contain.text", aff.tracking.breadcrumbs.tracking);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/tracking"
    );
    cy.get("h1").contains(aff.tracking.heading).should("be.visible");
    cy.title().should("eq", aff.tracking.heading);
  });
});
