import * as ord from "../fixtures/TS_017_Order History.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as inf from "../fixtures/TS_018_Order Information.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import { login } from "../support/login";

describe("Validate the working of My Orders > 'Order Information' functionality", () => {
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
  });

  it("TC-1: Validate all the required details of the Order are displayed in the 'Order Information' page", () => {
    cy.get('[class="table table-bordered table-hover"]')
      .eq(0)
      .find("tbody")
      .within(() => {
        cy.get('[class="text-left"]')
          .eq(0)
          .should("not.be.empty")
          .should("contain.text", inf["order details"].id)
          .should("contain.text", inf["order details"].date);
        cy.get('[class="text-left"]')
          .eq(1)
          .should("contain.text", inf["order details"].payment)
          .should("contain.text", inf["order details"].shipping);
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
      });

    cy.get('[class="table table-bordered table-hover"]')
      .eq(2)
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
          .eq(0)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-right"]')
          .eq(1)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-right"]')
          .eq(2)
          .invoke("text")
          .should("not.be.empty");
        cy.get('[class="text-right"]')
          .eq(3)
          .invoke("text")
          .should("not.be.empty");
      });

    cy.get('[class="table table-bordered table-hover"]')
      .eq(3)
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
  });

  it("TC-2: Validate the working of 'Reorder' icon option in the 'Order Information' page", () => {
    cy.get('[data-original-title="Reorder"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(inf.reorder.success + src["product 1"].product)
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });

  it("TC-3: Validate the working of 'Return' icon option in the 'Order Information' page", () => {
    cy.get('[data-original-title="Return"]').click();
    cy.get("h1").contains(inf["product return"].heading).should("be.visible");
  });

  it("TC-4: Validate the 'Continue' button on the 'Order Information' page", () => {
    cy.get('[class="btn btn-primary"]').contains(inf.continue.btn).click();
    cy.get("h1").contains(ord.myacc.heading).should("be.visible");
  });

  it("TC-5: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Order Information' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", ord.breadcrumb.acc)
      .and("contain.text", ord.myacc.heading)
      .and("contain.text", inf.breadcrumb.info);
    cy.url().should(
      "include",
      "https://awesomeqa.com/ui/index.php?route=account/order/info&order"
    );
    cy.get("h2").contains(ord.myacc.heading).should("be.visible");
    cy.title().should("eq", inf.title.title);
  });
});
