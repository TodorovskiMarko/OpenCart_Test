import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import * as add from "../fixtures/TS_016_Address Book.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as spc from "../fixtures/TS_010_Shopping Cart.json";
import * as ckt from "../fixtures/TS_012_Checkout.json";
import { login } from "../support/login";

describe("Validate the working of My Account > 'Address Book' functionality", () => {
  let testNumber = 0;
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    if (testNumber != 3) {
      login();
    }
  });

  it("TC-1: Validate navigating to 'Address Book Entries' page from 'My Account' dropmenu", () => {
    testNumber = 1;
    cy.get('[class="list-unstyled"]').contains(add.myacc.modify).click();
  });

  it("TC-2: Validate navigating to 'Address Book Entries' page from Right Column options", () => {
    testNumber = 2;
    cy.get('[class="list-group"]').contains(add["right column"].btn).click();
  });

  it("TC-3: Validate navigating to 'Address Book Entries' page from 'Site Map' page", () => {
    testNumber = 3;
    cy.get('[class="list-unstyled"]')
      .contains(add["site map"].site)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get('[class="col-sm-6"]').contains(add["site map"].btn).click();
  });

  it("TC-4: Validate navigating to 'Address Book Entries' page from Right Column options before logging into the Application", () => {
    testNumber = 4;
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(reg["before each"].register)
      .should("be.visible")
      .click();
    cy.get('[id="content"]')
      .contains(reg["before each"].regacc)
      .should("be.visible");
    cy.get('[class="list-group"]').contains(add["right column"].btn).click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");
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
    cy.get("h2").should("contain.text", add.myacc.heading);
  });
});

describe("Validate the working of My Account > 'Address Book' functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    login();
    cy.get('[class="list-group"]').contains(add["right column"].btn).click();
    cy.get("h2").should("contain.text", add.myacc.heading);
  });

  it("TC-5: Validate default address displayed in the 'Address Book Entries' page", () => {
    cy.get('[class="text-left"]')
      .eq(1)
      .should("contain.text", add["default address"].fullname)
      .and("contain.text", add["default address"].address)
      .and("contain.text", add["default address"].city)
      .and("contain.text", add["default address"].region)
      .and("contain.text", add["default address"].country);
  });

  it("TC-6: Validate deleting the default address in the 'Address Book Entries' page", () => {
    cy.get('[class="btn btn-danger"]').contains(add.delete.btn).click();
    cy.get('[class="alert alert-warning"]')
      .contains(add.delete.warning)
      .should("be.visible");
  });

  it("TC-7: Validate updating the Address in the 'Address Book Entries' page", () => {
    cy.get('[class="btn btn-info"]').contains(add.update.btn).click();
    cy.get("h2").contains(add.update.heading).should("exist").and("be.visible");
    cy.get('[id="input-firstname"]').clear().type(add.update.firstname);
    cy.get('[id="input-lastname"]').clear().type(add.update.lastname);
    cy.get('[id="input-company"]').type(add.update.company);
    cy.get('[id="input-address-1"]').clear().type(add.update.address);
    cy.get('[id="input-address-2"]').type(add.update["address 2"]);
    cy.get('[id="input-city"]').clear().type(add.update.city);
    cy.get('[id="input-postcode"]').clear().type(add.update["post code"]);
    cy.get('[id="input-zone"]')
      .select("3566")
      .should("contain.text", add.update.region);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(add.update.success)
      .should("be.visible");
  });

  it("TC-8: Validate updating the Address  by clearing all the non-mandatory fields", () => {
    cy.get('[class="btn btn-info"]').contains(add.update.btn).click();
    cy.get("h2").contains(add.update.heading).should("exist").and("be.visible");
    cy.get('[id="input-company"]').clear();
    cy.get('[id="input-address-2"]').clear();
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(add.update.success)
      .should("be.visible");
  });

  it("TC-9: Validate clearing all the fields in the 'Edit Address' page and updating the Address", () => {
    cy.get('[class="btn btn-info"]').contains(add.update.btn).click();
    cy.get("h2").contains(add.update.heading).should("exist").and("be.visible");
    cy.get('[id="input-firstname"]').clear();
    cy.get('[id="input-lastname"]').clear();
    cy.get('[id="input-address-1"]').clear();
    cy.get('[id="input-address-2"]').clear();
    cy.get('[id="input-city"]').clear();
    cy.get('[id="input-postcode"]').clear();
    cy.get('[id="input-country"]').select("");
    cy.get('[type="submit"]').click();

    const expectedSentences = [
      add["empty fields"].firstname,
      add["empty fields"].lastname,
      add["empty fields"].address,
      add["empty fields"].city,
      add["empty fields"].country,
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

  it("TC-10: Validate Back button in the 'Edit Address' page", () => {
    cy.get('[class="btn btn-info"]').contains(add.update.btn).click();
    cy.get("h2").contains(add.update.heading).should("exist").and("be.visible");
    cy.get('[id="input-firstname"]').clear().type(add["back button"].firstname);
    cy.get('[id="input-lastname"]').clear().type(add["back button"].lastname);
    cy.get('[id="input-company"]').type(add["back button"].company);
    cy.get('[id="input-address-1"]').clear().type(add["back button"].address);
    cy.get('[id="input-address-2"]').type(add["back button"]["address 2"]);
    cy.get('[id="input-city"]').clear().type(add["back button"].city);
    cy.get('[id="input-postcode"]')
      .clear()
      .type(add["back button"]["post code"]);
    cy.get('[id="input-zone"]')
      .select("3566")
      .should("contain.text", add["back button"].city);
    cy.go("back");

    cy.get('[class="btn btn-info"]').contains(add.update.btn).click();
    cy.get('[id="input-firstname"]').should("have.value", add.update.firstname);
    cy.get('[id="input-lastname"]').should("have.value", add.update.lastname);
    cy.get('[id="input-address-1"]').should("have.value", add.update.address);
    cy.get('[id="input-city"]').should("have.value", add.update.city);
    cy.get('[id="input-postcode"]').should(
      "have.value",
      add.update["post code"]
    );
    cy.get('[id="input-zone"]').should("contain.text", add.update.region);
  });

  it("TC-11: Validate Back button in the 'Address Book Entries' page", () => {
    cy.go("back");
    cy.get('[id="content"]')
      .contains(reg["created acc"].myacc)
      .should("be.visible");
  });

  it("TC-12: Validate adding new Address by providing only the mandatory fields", () => {
    cy.get('[class="btn btn-primary"]')
      .contains(add["new address"].btn)
      .click();
    cy.get("h2")
      .contains(add["new address"].heading)
      .should("exist")
      .and("be.visible");
    cy.get('[id="input-firstname"]').type(add["new address"].firstname);
    cy.get('[id="input-lastname"]').type(add["new address"].lastname);
    cy.get('[id="input-company"]').type(add["new address"].company);
    cy.get('[id="input-address-1"]').type(add["new address"].address);
    cy.get('[id="input-address-2"]').type(add["new address"]["address 2"]);
    cy.get('[id="input-city"]').type(add["new address"].city);
    cy.get('[id="input-postcode"]').type(add["new address"]["post code"]);
    cy.get('[id="input-zone"]')
      .select("3514")
      .should("contain.text", add["new address"].region);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(add["new address"].success)
      .should("be.visible");
  });

  it("TC-13: Validate selecting the newly added Address as default address", () => {
    cy.get('[class="btn btn-info"]').eq(1).contains(add.update.btn).click();
    cy.get("h2").contains(add.update.heading).should("exist").and("be.visible");
    cy.get('[id="input-zone"]')
      .select("3514")
      .should("contain.text", add["new address"].region);
    cy.get('[type="radio"]').eq(0).click();
    cy.get('[type="submit"]').click();
    cy.get('[class="btn btn-danger"]').eq(1).contains(add.delete.btn).click();
    cy.get('[class="alert alert-warning"]')
      .contains(add.delete.warning)
      .should("be.visible");
  });

  it("TC-14: Validate new address given for Billing Details while placing the order should get added in 'Address Book Entries' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");

    // Checkout page
    cy.get('[class="radio"]')
      .eq(1)
      .find('[type="radio"]')
      .should("not.be.checked")
      .check();
    cy.get('[id="input-payment-firstname"]').type(
      add["checkout address"].firstname
    );
    cy.get('[id="input-payment-lastname"]').type(
      add["checkout address"].lastname
    );
    cy.get('[id="input-payment-company"]').type(
      add["checkout address"].company
    );
    cy.get('[id="input-payment-address-1"]').type(
      add["checkout address"].address
    );
    cy.get('[id="input-payment-address-2"]').type(
      add["checkout address"]["address 2"]
    );
    cy.get('[id="input-payment-city"]').type(add["checkout address"].city);
    cy.get('[id="input-payment-postcode"]').type(
      add["checkout address"]["post code"]
    );
    cy.get('[id="input-payment-zone"]')
      .select("3548")
      .should("contain.text", add["checkout address"].city);
    cy.get("[id=button-payment-address]").click();
    cy.get('[id="button-shipping-address"]').click();
    cy.get('[id="button-shipping-method"]').click();
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();
    cy.get('[id="button-confirm"]').click();
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");

    // See if address is added
    cy.get('[title="My Account"]').click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/account"]')
      .eq(1)
      .click();
    cy.get('[class="list-group"]').contains(add["right column"].btn).click();
    cy.get("h2").should("contain.text", add.myacc.heading);
    cy.get('[class="text-left"]').should(
      "contain.text",
      add["checkout address"].firstname + " " + add["checkout address"].lastname
    );
  });

  it("TC-15: Validate new address given for Delivery Details while placing the order should get added in 'Address Book Entries' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(spc.added.success)
      .should("exist")
      .and("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .contains(spc.added.cart)
      .click();
    cy.get('[class="btn btn-primary"]').contains(ckt.checkout.checkout).click();
    cy.get("h1").should("contain", ckt.checkout.checkout).and("be.visible");

    // Checkout page
    cy.get("[id=button-payment-address]").click();
    cy.get('[name="shipping_address"]').eq(1).check();
    cy.get('[id="input-shipping-firstname"]').type(
      add["checkout address 2"].firstname
    );
    cy.get('[id="input-shipping-lastname"]').type(
      add["checkout address 2"].lastname
    );
    cy.get('[id="input-shipping-company"]').type(
      add["checkout address 2"].company
    );
    cy.get('[id="input-shipping-address-1"]').type(
      add["checkout address 2"].address
    );
    cy.get('[id="input-shipping-address-2"]').type(
      add["checkout address 2"]["address 2"]
    );
    cy.get('[id="input-shipping-city"]').type(add["checkout address 2"].city);
    cy.get('[id="input-shipping-postcode"]').type(
      add["checkout address 2"]["post code"]
    );
    cy.get('[id="button-shipping-address"]').click();
    cy.get('[id="button-shipping-method"]').click();
    cy.get('[name="agree"]').check();
    cy.get('[id="button-payment-method"]').click();
    cy.get('[id="button-confirm"]').click();
    cy.get("h1").contains(ckt["order placed"].heading).should("be.visible");

    // See if address is added
    cy.get('[title="My Account"]').click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/account"]')
      .eq(1)
      .click();
    cy.get('[class="list-group"]').contains(add["right column"].btn).click();
    cy.get("h2").should("contain.text", add.myacc.heading);
    cy.get('[class="text-left"]').should(
      "contain.text",
      add["checkout address 2"].firstname +
        " " +
        add["checkout address 2"].lastname
    );
  });

  it("TC-16: Validate deleting an address", () => {
    cy.get('[class="btn btn-danger"]').eq(3).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(add.delete.success)
      .should("be.visible");
  });

  it("TC-17: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Address Book Entries' page", () => {
    cy.get('[class="breadcrumb"]')
      .should("contain.text", add.breadcrumbs.acc)
      .and("contain.text", add.breadcrumbs.address);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/address"
    );
    cy.get("h2").should("contain.text", add.myacc.heading);
    cy.title().should("eq", add.breadcrumbs.address);
  });

  it("TC-18: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Edit Address' page", () => {
    cy.get('[class="btn btn-info"]').eq(0).click();
    cy.get('[class="breadcrumb"]')
      .should("contain.text", add.breadcrumbs.acc)
      .and("contain.text", add.breadcrumbs.address)
      .and("contain.text", add.breadcrumbs.edit);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/address/edit&address_id=209"
    );
    cy.get("h2").should("contain.text", add.update.heading);
    cy.title().should("eq", add.breadcrumbs.address);
  });

  it("TC-19: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Add Address' page", () => {
    cy.get('[class="btn btn-primary"]')
      .contains(add["new address"].btn)
      .click();
    cy.get('[class="breadcrumb"]')
      .should("contain.text", add.breadcrumbs.acc)
      .and("contain.text", add.breadcrumbs.address)
      .and("contain.text", add.breadcrumbs.add);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=account/address/add"
    );
    cy.get("h2").contains(add["new address"].heading).and("be.visible");
    cy.title().should("eq", add.breadcrumbs.address);
  });
});
