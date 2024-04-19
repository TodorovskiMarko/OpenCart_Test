import * as spe from "../fixtures/TS_029_Special Offers.json";
import * as wsh from "../fixtures/TS_009_Wish List.json";
import * as src from "../fixtures/TS_005_Search.json";
import { login } from "../support/login";

describe("Validate the working of 'Speal Offers' page functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
    cy.get('[class="list-unstyled"]')
      .contains(spe.link)
      .scrollIntoView({ duration: 600 })
      .click();
    cy.get("h2").contains(spe.heading).should("be.visible");
  });

  it("TC-1: Validate navigating to 'Special Offers' page using 'Specials' footer link", () => {
    // Done in BeforeEach
  });

  it("TC-2: Validate navigating to 'Special Offers' page from 'Site Map' page", () => {
    cy.get('[class="list-unstyled"]')
      .contains(spe["site map link"])
      .scrollIntoView({ duration: 500 })
      .click();
    cy.get("h1").contains(spe["site map link"]).should("be.visible");
    cy.get('[class="col-sm-6"]').contains(spe.heading).click();
    cy.get("h2").contains(spe.heading).should("be.visible");
  });

  it("TC-3: Validate the Products which are sold at offer price are displayed in the 'Special Offers' page", () => {
    cy.get('[class="price"]').each(($product) => {
      const originalPrice = $product.find('[class="price-old"]');
      const specialPrice = $product.find('[class="price-new"]');

      expect(originalPrice).to.have.css("color", "rgb(153, 153, 153)");
      expect(originalPrice).to.have.css(
        "text-decoration",
        "line-through solid rgb(153, 153, 153)"
      );

      expect(specialPrice).to.have.css("font-weight", "600");
    });
  });

  it("TC-4: Validate viewing the Products in Speical Offers' page in List view", () => {
    cy.get('[id="list-view"]').click();
    cy.get('[class="caption"]').each(($product) => {
      expect($product).to.have.css("display", "block");
      expect($product).to.have.css("margin-bottom", "0px");
    });
  });

  it("TC-5: Validate viewing the Products in Speical Offers' page in Grid view", () => {
    cy.get('[id="grid-view"]').click();
    cy.get('[class="caption"]').each(($product) => {
      expect($product).to.have.css("display", "block");
      expect($product).to.have.css("margin", "0px");
    });
  });

  it("TC-6: Validate 'Product Compare' link in the 'Special Offers' page", () => {
    cy.get('[class="btn btn-link"]')
      .contains(spe["product compare"].link)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-7: Validate Sorting the Products in the 'Special Offers' page using 'Sort By' field", () => {
    cy.get('[id="input-sort"]').select(spe["sort by select"]);
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

  it.skip("TC-8: Validate the number of Products displayed in the 'Special Offers' page using the 'Show' field", () => {
    // There are only 2 products in "Special Offers" and the minimum number in "Show" is 15
  });

  it("TC-9: Validate adding the Product to Cart from the 'Special Offers' page", () => {});

  it("TC-10: Validate adding the Product to Wish List from the 'Special Offers' page", () => {
    login();
    cy.get('[class="list-unstyled"]')
      .contains(spe.link)
      .scrollIntoView({ duration: 600 })
      .click();
    cy.get("h2").contains(spe.heading).should("be.visible");
    cy.get('[data-original-title="Add to Wish List"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      wsh.added.success + spe.products["product 1"]
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=account/wishlist"]')
      .eq(1)
      .click();
    cy.get("h2").contains(wsh.added.heading).should("exist").and("be.visible");
    cy.get('[class="text-left"]').should("contain", spe.products["product 1"]);
  });

  it("TC-11: Validate 'Product Compare' link in the 'Special Offers' page", () => {
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-12: Validate User is navigating to Product Display Page from 'Special Offers' page", () => {
    cy.get('[class="caption"]').contains(spe.products["product 1"]).click();
    cy.get("h1").contains(spe.products["product 1"]).should("be.visible");
  });

  it("TC-13: Validate the Breadcrumb, Page URL, Page Heading and Page Title of 'Special Offers' page", () => {
    cy.get('[class="breadcrumb"]').should("contain.text", spe.heading);
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=product/special"
    );
    cy.get("h2").contains(spe.heading).should("be.visible");
    cy.title().should("eq", spe.heading);
  });
});
