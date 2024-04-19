import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as ord from "../fixtures/TS_017_Order History.json";
import { Cryptography } from "../support/cryptography";

describe("Validate the working of My Orders > 'Order History' functionality", () => {
  let testNumber = 0;
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );

    if (testNumber !== 4) {
      cy.get('[title="My Account"]').click();
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
    }
  });

  it("TC-1: Validate navigating to 'Order History' page from 'My Account' page", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(ord.myacc.order).click();
  });

  it("TC-2: Validate navigating to 'Order History' page from 'My Account' dropmenu", () => {
    testNumber = 2;
    cy.get('[title="My Account"]').click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/order"]')
      .eq(0)
      .contains(ord.myacc.heading)
      .should("be.visible")
      .click();
  });

  it("TC-3: Validate navigating to 'Order History' page using 'Address Book' Right Column option", () => {
    testNumber = 3;
    cy.get('[class="list-group"]').contains(ord.myacc.heading).click();
  });

  it("TC-4: Validate navigating to 'Order History' page from 'Site Map' page", () => {
    testNumber = 4;
    cy.get('[class="list-unstyled"]')
      .contains(ord["site map"].site)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(ord["site map"].btn).click();
  });

  it("TC-5: Validate navigating to 'Order History' page from Right Column options before logging into the Application", () => {
    testNumber = 5;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .click();
    cy.get('[id="content"]').contains(reg["before each"].regacc);
    cy.get('[class="list-group"]').contains(ord.myacc.heading).click();
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
  });

  afterEach(() => {
    cy.get("h1").contains(ord.myacc.heading).should("be.visible");
  });
});

describe("Validate the working of My Orders > 'Order History' functionality", () => {
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
    cy.get('[id="input-email"]').type(reg.fields.email);
    cy.get('[id="input-password"]').type(
      Cryptography.decrypt(reg.fields.pass),
      { log: false }
    );
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
    cy.get('[class="list-group"]').contains(ord.myacc.heading).click();
    cy.get("h1").contains(ord.myacc.heading).should("be.visible");
  });

  it("TC-6: Validate all the orders made till date are displayed in the 'Order History' page", () => {
    cy.get('[class="table table-bordered table-hover"]')
      .find("tbody")
      .within(() => {
        cy.get("tr").each(($tr) => {
          expect($tr.text()).to.not.be.empty;
          cy.get('[class="text-left"]')
            .eq(2)
            .should(($element) => {
              const text = $element.text();
              const regex =
                /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
              expect(text).to.match(regex);
            });
        });
      });
  });

  it("TC-7: Validate Continue button in the 'Order History' page", () => {
    cy.get('[class="btn btn-primary"]').contains(ord.continue.btn).click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-8: Validate navigating to 'Order Information'  page from 'Order History' page using 'View' icon option", () => {
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="text-left"]')
      .should("contain", ord["order information"].details)
      .and("be.visible");
  });

  it("TC-9: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Order History' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", ord.breadcrumb.acc)
      .and("contain.text", ord.myacc.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/order"
    );
    cy.get("h1").contains(ord.myacc.heading).should("be.visible");
    cy.title().should("eq", ord.myacc.heading);
  });
});
