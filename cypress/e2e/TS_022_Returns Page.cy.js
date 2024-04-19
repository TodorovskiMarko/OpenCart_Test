import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as rep from "../fixtures/TS_022_Returns Page.json";
import { Cryptography } from "../support/cryptography";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Returned Requests' functionality", () => {
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

  it("TC-1: Validate navigating to 'Product Returns' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(rep.myacc.return).click();
  });

  it("TC-2: Validate navigating to 'Product Returns' page using Right column option", () => {
    testNumber = 2;
    cy.get('[class="list-group"]').contains(rep["right column"]).click();
  });

  it("TC-3: Validate navigating to 'Product Returns' page by selecting the option from Right Column options before login", () => {
    testNumber = 3;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[class="list-group"]').contains(rep["right column"]).click();
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
    cy.get("h1").contains(rep.myacc.heading).should("be.visible");
  });
});

it("TC-4: Validate navigating to 'Product Returns' page when there are no products returned by the User", () => {
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
  cy.get('[id="input-email"]').type(reg["TC-17 email"].email6);
  cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), {
    log: false,
  });
  cy.get('[type="submit"]').click();
  cy.get('[id="content"]')
    .contains(reg["created acc"].myacc)
    .should("be.visible");
  cy.get('[class="list-group"]').contains(rep["right column"]).click();
  cy.get("h1").contains(rep.myacc.heading).should("be.visible");
  cy.get('[id="content"]')
    .find("p")
    .should("contain.text", rep["no returns text"]);
});

describe("Validate the working of My Orders > 'Returned Requests' functionality part 2", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-group"]').contains(rep["right column"]).click();
    cy.get("h1").contains(rep.myacc.heading).should("be.visible");
  });

  it("TC-5: Validate 'Continue' button on the 'Product Returns' page", () => {
    cy.get('[class="btn btn-primary"]').contains(rep["continue btn"]).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-6: Validate the Table containing the Product Return details of the products returned by the User", () => {
    cy.get('[class="table table-bordered table-hover"]')
      .find("tbody")
      .within(() => {
        cy.get("tr").each(($tr) => {
          expect($tr.text()).to.not.be.empty;
          cy.get('[class="text-left"]')
            .eq(1)
            .should(($element) => {
              const text = $element.text();
              const regex =
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
              expect(text).to.match(regex);
            });
        });
      });
  });

  it("TC-7: Validate navigating to 'Return Information' page from 'Product Returns' page", () => {
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="breadcrumb"]').should("contain.text", rep.breadcrumbs.info);
  });

  it("TC-8: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Product Returns' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", rep.breadcrumbs.acc)
      .and("contain.text", rep.myacc.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/return"
    );
    cy.get("h1").contains(rep.myacc.heading).should("be.visible");
    cy.title().should("eq", rep.myacc.heading);
  });

  it("TC-9: Validate the details in the 'Return Information' page", () => {
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="table table-bordered table-hover"]')
      .eq(0)
      .find("tbody")
      .within(() => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        cy.get('[class="text-left"]')
          .eq(0)
          .should("not.be.empty")
          .should("contain.text", rep["return details"].return)
          .should("contain.text", rep["return details"].added);
        cy.get('[class="text-left"]')
          .eq(1)
          .should("contain.text", rep["return details"].order)
          .should("contain.text", rep["return details"].date);
      });

    cy.get('[class="table table-bordered table-hover"]')
      .eq(1)
      .find("tbody")
      .within(() => {
        cy.get('[class="text-left"]')
          .eq(0)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-left"]')
          .eq(1)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-right"]')
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.match(/^\d+$/);
          });
      });

    cy.get('[class="list table table-bordered table-hover"]')
      .find("tbody")
      .within(() => {
        cy.get('[class="text-left"]')
          .eq(0)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-left"]')
          .eq(1)
          .invoke("text")
          .should("not.be.empty");
      });

    cy.get('[class="table table-bordered table-hover"]')
      .eq(2)
      .find("tbody")
      .within(() => {
        cy.get('[class="text-center"]').should("contain.text", "No results!");
      });
  });

  it("TC-10: Validate 'Continue' button in the 'Return Information' page", () => {
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="btn btn-primary"]').contains(rep["continue btn"]).click();
    cy.get("h1").contains(rep.myacc.heading).should("be.visible");
  });

  it("TC-11: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Return Information' page", () => {
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="breadcrumb"]')
      .should("contain.text", rep.breadcrumbs.acc)
      .and("contain.text", rep.myacc.heading)
      .and("contain.text", rep.breadcrumbs.info);
    cy.url().should(
      "include",
      "https://awesomeqa.com/ui/index.php?route=account/return/info&"
    );
    cy.get("h1").contains(rep.myacc.heading).should("be.visible");
    cy.title().should("eq", rep.breadcrumbs.info);
  });
});
