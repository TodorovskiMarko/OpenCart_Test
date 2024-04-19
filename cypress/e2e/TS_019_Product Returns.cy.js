import * as reg from "../fixtures/TS_001_Register.json";
import * as ord from "../fixtures/TS_017_Order History.json";
import * as inf from "../fixtures/TS_018_Order Information.json";
import * as ret from "../fixtures/TS_019_Product Returns.json";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Product Returns' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-group"]').contains(ord.myacc.heading).click();
    cy.get("h1").contains(ord.myacc.heading).should("be.visible");
    cy.get('[data-original-title="View"]').eq(0).click();
    cy.get('[class="text-left"]')
      .should("contain", ord["order information"].details)
      .and("be.visible");
    cy.get('[data-original-title="Return"]').click();
    cy.get("h1").contains(inf["product return"].heading).should("be.visible");
  });

  it("TC-1: Validate navigating to 'Product Returns' page", () => {
    // Done in BeforeEach
  });

  it("TC-2: Validate submit the Product for return by filling all the fields and selecting all the options in the 'Product Returns' page", () => {
    cy.get('[name="return_reason_id"]').eq(0).click();
    cy.get('[type="submit"]').click();
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", ret["submit return"].text);
  });

  it("TC-3: Validate clearing all the fields in the 'Product Returns' page and submit", () => {
    cy.get('[id="input-firstname"]').clear();
    cy.get('[id="input-lastname"]').clear();
    cy.get('[id="input-email"]').clear();
    cy.get('[id="input-telephone"]').clear();
    cy.get('[id="input-order-id"]').clear();
    cy.get('[id="input-date-ordered"]').clear();
    cy.get('[id="input-product"]').clear();
    cy.get('[id="input-model"]').clear();
    cy.get('[id="input-quantity"]').clear();
    cy.get('[type="submit"]').click();

    const expectedSentences = [
      ret["empty fields warnings"].firstname,
      ret["empty fields warnings"].lastname,
      ret["empty fields warnings"].email,
      ret["empty fields warnings"].tel,
      ret["empty fields warnings"]["order id"],
      ret["empty fields warnings"]["product name"],
      ret["empty fields warnings"]["product model"],
      ret["empty fields warnings"]["return reason"],
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

  it("TC-4: Validate Placeholders for all the date and text fields in the 'Product Returns' page", () => {
    cy.get('[id="input-firstname"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.firstname
    );
    cy.get('[id="input-lastname"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.lastname
    );
    cy.get('[id="input-email"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.email
    );
    cy.get('[id="input-telephone"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.tel
    );
    cy.get('[id="input-order-id"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders["order id"]
    );
    cy.get('[id="input-date-ordered"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders["order date"]
    );
    cy.get('[id="input-product"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders["product name"]
    );
    cy.get('[id="input-model"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders["product model"]
    );
    cy.get('[id="input-quantity"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.quantity
    );
    cy.get('[id="input-comment"]').should(
      "have.attr",
      "placeholder",
      ret.placeholders.faulty
    );
  });

  it("TC-5: Validate Back button on the 'Product Returns' page", () => {
    cy.get('[id="input-firstname"]').clear().type(ret["new details"].firstname);
    cy.get('[id="input-lastname"]').clear().type(ret["new details"].lastname);
    cy.get('[id="input-email"]').clear().type(ret["new details"].email);
    cy.get('[id="input-telephone"]').clear().type(ret["new details"].tel);
    cy.get('[id="input-order-id"]')
      .clear()
      .type(ret["new details"]["order id"]);
    cy.get('[id="input-date-ordered"]')
      .clear()
      .type(ret["new details"]["order date"]);
    cy.get('[id="input-product"]')
      .clear()
      .type(ret["new details"]["product name"]);
    cy.get('[id="input-model"]')
      .clear()
      .type(ret["new details"]["product model"]);
    cy.get('[id="input-quantity"]').clear().type(ret["new details"].quantity);
    cy.get('[name="return_reason_id"]').eq(4).check();
    cy.get('[class="btn btn-default"]')
      .contains(ret["new details"]["back btn"])
      .click();
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-6: Validate E-Mail field in the 'Product Returns' page", () => {
    cy.get('[id="input-email"]').clear().type(ret["invalid email"]["email 1"]);
    cy.get('[name="return_reason_id"]').eq(4).check();
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .contains(ret["empty fields warnings"].email)
      .should("be.visible");
    cy.get('[id="input-email"]').clear().type(ret["invalid email"]["email 2"]);
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .contains(ret["empty fields warnings"].email)
      .should("be.visible");
    cy.get('[id="input-email"]').clear().type(ret["invalid email"]["email 3"]);
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .contains(ret["empty fields warnings"].email)
      .should("be.visible");
    cy.get('[id="input-email"]').clear().type(ret["invalid email"]["email 4"]);
    cy.get('[type="submit"]').click();
    cy.get("[class=text-danger]")
      .contains(ret["empty fields warnings"].email)
      .should("be.visible");
  });

  it.skip("TC-7: Validate Order Date field in the 'Product Returns' page", () => {
    cy.get('[id="input-date-ordered"]').type(ret["future date"]);
    cy.get('[name="return_reason_id"]').eq(3).check();
    cy.get('[type="submit"]').click();

    // Provides future date without giving an error - Report Defect
  });

  it("TC-8: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Product Returns' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", ret.breadcrumbs.acc)
      .and("contain.text", ret.breadcrumbs.prodret);
    cy.url().should(
      "include",
      "https://awesomeqa.com/ui/index.php?route=account/return/add"
    );
    cy.get("h1").contains(inf["product return"].heading).should("be.visible");
    cy.title().should("eq", inf["product return"].heading);
  });
});
