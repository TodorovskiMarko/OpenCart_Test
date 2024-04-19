import * as hmf from "../fixtures/TS_030_Header Menu Footer Options.json";
import * as src from "../fixtures/TS_005_Search.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";
import * as add from "../fixtures/TS_008_Add to Cart.json";
import * as wsh from "../fixtures/TS_009_Wish List.json";
import { login } from "../support/login";

describe("Validate the working of 'Header' options, 'Menu' options and 'Footer' options", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate correct Phone number is displayed for the 'Contact Us' Header option", () => {
    cy.get('[class="hidden-xs hidden-sm hidden-md"]').should(
      "contain.text",
      hmf["phone number"]
    );
  });

  it("TC-2: Validate Currency header option is displayed with the required list of Currencies", () => {
    cy.get('[class="btn btn-link dropdown-toggle"]')
      .should("be.visible")
      .click();

    const texts = [
      hmf.currencies.euro,
      hmf.currencies.pound,
      hmf.currencies.dollar,
    ];

    cy.get('[class="currency-select btn btn-link btn-block"]')
      .invoke("text")
      .then((text) => {
        texts.forEach((expectedText) => {
          expect(text).to.include(expectedText);
        });
      });
  });

  it("TC-3: Validate the Menu options", () => {
    cy.get('[class="dropdown-toggle"]')
      .contains(hmf["menu headers"].desktops.link)
      .click();
    cy.get('[class="list-unstyled"]')
      .should("contain.text", hmf["menu headers"].desktops["option 1"])
      .and("contain.text", hmf["menu headers"].desktops["option 2"]);
    cy.get('[class="see-all"]')
      .contains(hmf["menu headers"].desktops["show all"])
      .click();
    cy.get("h2")
      .should("contain.text", hmf["menu headers"].desktops.link)
      .and("be.visible");
  });

  it("TC-4: Validate 'About Us' Footer link", () => {
    cy.get('[class="list-unstyled"]')
      .contains(hmf["about us"].link)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf["about us"].link).and("be.visible");
    cy.get('[id="content"]')
      .find("p")
      .should("contain.text", hmf["about us"].link);
  });

  it("TC-5: Validate 'Delivery Information' Footer link", () => {
    cy.get('[class="list-unstyled"]')
      .contains(hmf.delivery)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf.delivery).and("be.visible");
    cy.get('[id="content"]').find("p").should("contain.text", hmf.delivery);
  });

  it("TC-6: Validate 'Privacy Policy' Footer link", () => {
    cy.get('[class="list-unstyled"]')
      .contains(hmf.privacy)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf.privacy).and("be.visible");
    cy.get('[id="content"]').find("p").should("contain.text", hmf.privacy);
  });

  it("TC-7: Validate 'Terms & Conditions' Footer link", () => {
    cy.get('[class="list-unstyled"]')
      .contains(hmf.terms)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf.terms).and("be.visible");
    cy.get('[id="content"]').find("p").should("contain.text", hmf.terms);
  });
});

describe("Validate the working of 'Header' options, 'Menu' options and 'Footer' options (brands)", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[class="list-unstyled"]')
      .contains(hmf.brands.link)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf.brands.heading).and("be.visible");
    cy.get('[class="col-sm-3"]').contains(hmf.brands.brand).click();
    cy.get("h2").should("contain.text", hmf.brands.brand).and("be.visible");
  });

  it("TC-8: Validate 'Brands' Footer link", () => {
    cy.get('[class="caption"]').should("have.length", 10);
  });

  it("TC-9: Validate viewing the Products in 'Brand' page in List view", () => {
    cy.get('[id="list-view"]').click();
    cy.get('[class="caption"]').each(($product) => {
      expect($product).to.have.css("display", "block");
      expect($product).to.have.css("margin-bottom", "0px");
    });
  });

  it("TC-10: Validate viewing the Products in 'Brand' page in Grid view", () => {
    cy.get('[id="grid-view"]').click();
    cy.get('[class="caption"]').each(($product) => {
      expect($product).to.have.css("display", "block");
      expect($product).to.have.css("margin-bottom", "0px");
    });
  });

  it("TC-11: Validate 'Product Compare' link in the 'Brand' page", () => {
    cy.get('[class="btn btn-link"]').contains(hmf["product compare"]).click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-12: Validate Sorting the Products in the 'Brand' page using 'Sort By' field", () => {
    cy.get('[id="input-sort"]').select(hmf["sort by select"]);
    cy.get('[class="caption"]').then(($products) => {
      const productNames = $products
        .map((index, element) => Cypress.$(element).text())
        .get();

      const sortedProductNames = [...productNames].sort((a, b) =>
        b.localeCompare(a)
      );
      expect(productNames).to.deep.equal(sortedProductNames);
    });
  });

  it.skip("TC-13: Validate the number of Products displayed in the 'Brand' page using the 'Show' field", () => {
    // There are only 10 products in "Apple" and the minimum number in "Show" is 15
  });

  it("TC-14: Validate adding the Product to Cart from the 'Brand' page", () => {
    cy.get(`[onclick="cart.add('41', '1');"]`).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      add["added to cart"].success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(2)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });

  it("TC-15: Validate adding the Product to Wish List from the 'Brand' page", () => {
    login();
    cy.get('[class="list-unstyled"]')
      .contains(hmf.brands.link)
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").should("contain.text", hmf.brands.heading).and("be.visible");
    cy.get('[class="col-sm-3"]').contains(hmf.brands.brand).click();
    cy.get("h2").should("contain.text", hmf.brands.brand).and("be.visible");

    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Add to Wish List"]').eq(1).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + src["product 1"].product
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", src["product 1"].product);
  });

  it("TC-16: Validate 'Product Compare' link in the 'Brand' page", () => {
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-17: Validate User is navigating to Product Display Page from 'Brand' page", () => {
    cy.get('[title="iMac"]').click();
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
  });
});
