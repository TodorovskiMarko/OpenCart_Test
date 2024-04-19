import * as src from "../fixtures/TS_005_Search.json";
import * as pcr from "../fixtures/TS_006_Product Compare.json";

describe("Validate the working of Product Compare functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate adding the product for comparision from Product Display Page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
  });

  it("TC-2: Validate adding the product for comparision from List View of Search Results page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[id="list-view"]').click();
    cy.get('[class="caption"]')
      .contains(src["product 1"].product)
      .should("have.length", 1);
  });

  it("TC-3: Validate adding the product for comparision from Grid View of Search Results page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[id="grid-view"]').click();
    cy.get('[class="caption"]')
      .contains(src["product 1"].product)
      .should("have.length", 1);
  });

  it("TC-4: Validate adding the product for comparision from List View of Product Category or Sub Category page", () => {
    cy.get('[class="dropdown-toggle"]').contains(pcr.dropdown.desktops).click();
    cy.get('[class="see-all"]').contains(pcr.dropdown["show all"]).click();
    cy.get('[id="list-view"]').click();
  });

  it("TC-5: Validate adding the product for comparision from Grid View of Product Category or Sub Category page", () => {
    cy.get('[class="dropdown-toggle"]').contains(pcr.dropdown.desktops).click();
    cy.get('[class="see-all"]').contains(pcr.dropdown["show all"]).click();
    cy.get('[id="grid-view"]').click();
  });

  afterEach(() => {
    cy.get('[data-original-title="Compare this Product"]')
      .eq(0)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });
});

describe("Validate the working of Product Compare functionality part 2", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-6: Validate adding the product for comparision from Related Product section on Product Display Page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Compare this Product"]')
      .eq(1)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(1).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-7: Validate adding the product for comparision from Featured section on Home Page", () => {
    cy.get('[data-original-title="Compare this Product"]')
      .eq(1)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(1).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-8: Validate navigating to 'Product Compare' page from Search results page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="form-group"]')
      .contains(pcr.compare["product compare"])
      .should("exist")
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-9: Validate navigating to 'Product Compare' page from Product Category page", () => {
    cy.get('[class="dropdown-toggle"]').contains(pcr.dropdown.desktops).click();
    cy.get('[class="see-all"]').contains(pcr.dropdown["show all"]).click();
    cy.get('[data-original-title="Compare this Product"]')
      .eq(1)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(1).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-10: Validate 'Product Compare' page when no products are added for comparison", () => {
    cy.get('[class="dropdown-toggle"]').contains(pcr.dropdown.desktops).click();
    cy.get('[class="see-all"]').contains(pcr.dropdown["show all"]).click();
    cy.get('[class="form-group"]')
      .contains(pcr.compare["product compare"])
      .should("exist")
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get("p").eq(1).contains(pcr.compare["no product"]).should("be.visible");
  });

  it("TC-11: Validate  the working of 'Continue' button on the 'Product Compare' page", () => {
    cy.get('[class="dropdown-toggle"]').contains(pcr.dropdown.desktops).click();
    cy.get('[class="see-all"]').contains(pcr.dropdown["show all"]).click();
    cy.get('[class="form-group"]')
      .contains(pcr.compare["product compare"])
      .should("exist")
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get("p").eq(1).contains(pcr.compare["no product"]).should("be.visible");
    cy.get('[class="pull-right"]').contains(pcr.compare.continue).click();
    cy.get('[id="common-home"]').should("be.visible");
  });

  it("TC-12: Validate the 'Product Comparison' page when only one producted is added to the page for comparison", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get('[data-original-title="Compare this Product"]')
      .eq(0)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 1);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible");
    cy.get('[class="btn btn-danger btn-block"]')
      .contains(pcr.buttons.remove)
      .should("be.visible");
  });

  it("TC-13: Validate the 'Product Comparison' page when only two products are added to the page for comparison", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 2"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]')
      .eq(0)
      .trigger("mouseover");
    cy.get(".tooltip-inner").should("contain", "Compare this Product");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 2);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible")
      .and("have.length", 2);
    cy.get('[class="btn btn-danger btn-block"]')
      .should("contain", pcr.buttons.remove)
      .and("be.visible")
      .and("have.length", 2);
  });

  it("TC-14: Validate the 'Product Comparison' page when the same product is added twice to the page for comparison", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 1);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible");
    cy.get('[class="btn btn-danger btn-block"]')
      .contains(pcr.buttons.remove)
      .should("be.visible");
  });

  it("TC-15: Validate the 'Product Comparison' page when three products are added to the page for comparison", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 2"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 3"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 3);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible")
      .and("have.length", 3);
    cy.get('[class="btn btn-danger btn-block"]')
      .should("contain", pcr.buttons.remove)
      .and("be.visible")
      .and("have.length", 3);
  });

  it("TC-16: Validate the 'Product Comparison' page when four products are added to the page for comparison", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 2"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 3"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 4"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 4);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible")
      .and("have.length", 4);
    cy.get('[class="btn btn-danger btn-block"]')
      .should("contain", pcr.buttons.remove)
      .and("be.visible")
      .and("have.length", 4);
  });

  it("TC-17: Validate that more than 4 products cannot be added to the 'Product Comparison' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 2"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 3"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 4"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[id="search"]').clear();
    cy.get('[id="search"]').type(pcr.compare["product 5"] + "{enter}");
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="img-thumbnail"]').should("have.length", 4);
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible")
      .and("have.length", 4);
    cy.get('[class="btn btn-danger btn-block"]')
      .should("contain", pcr.buttons.remove)
      .and("be.visible")
      .and("have.length", 4);
    cy.get("td").should("not.contain", src["product 1"].product);
  });

  it("TC-18: Validate adding the Products to cart from the 'Product Comparison' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="btn btn-primary btn-block"]')
      .should("have.value", pcr.buttons.add)
      .and("be.visible")
      .click();
    cy.get('[class="alert alert-success alert-dismissible"]').should(
      "contain",
      pcr["added to cart"].cart
    );
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=checkout/cart"]')
      .eq(1)
      .click();
    cy.get("h1")
      .should("contain", pcr["added to cart"].heading)
      .and("be.visible");
  });

  it("TC-19: Validate removing the Products from the 'Product Comparison' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.get('[class="btn btn-danger btn-block"]')
      .should("contain", pcr.buttons.remove)
      .and("be.visible")
      .click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(pcr.removed.message)
      .should("exist")
      .and("be.visible");
    cy.get("td").should("not.exist");
  });

  it("TC-20: Validate the Breadcrumb, Page Title, Page Heading and Page URL of the 'Product Comparison' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').eq(0).click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(0)
      .click();
    cy.get('[class="breadcrumb"]').should("contain", pcr.breadcrumb.pc);
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=product/compare"
    );
    cy.title().should("eq", src["product compare"].heading);
  });
});
