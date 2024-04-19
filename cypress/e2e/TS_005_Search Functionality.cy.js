import * as src from "../fixtures/TS_005_Search.json";
import { login } from "../support/login";

describe("Validate the working of Search functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate searching with an existing Product Name", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-2: Validate searching with a non existing Product Name", () => {
    cy.get('[id="search"]').type(
      src["non existing product"].product + "{enter}"
    );
    cy.get("p").eq(2).should("contain", src["non existing product"].message);
  });

  it("TC-3: Validate searching without providing any Product Name", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get("p").eq(2).should("contain", src["non existing product"].message);
  });

  it("TC-4: Validate searching for a product after login to the Application", () => {
    login();
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-5: Validate searching by providing a search criteria which results in mulitple products", () => {
    cy.get('[id="search"]').type(src["product 2"].product + "{enter}");
    cy.get('[class="row"]').should("have.length.gt", 1);
  });

  it("TC-6: Validate all the fields in the Search functionality and Search page have placeholders", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get('[name="search"]')
      .eq(0)
      .should("have.attr", "placeholder", src.placeholders.search);
    cy.get('[id="input-search"]').should(
      "have.attr",
      "placeholder",
      src.placeholders["search criteria"]
    );
  });

  it("TC-7: Validate searching using 'Search Criteria' field", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get('[id="input-search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-8: Validate Search using the text from the product description", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get('[id="input-search"]').type(
      src["text from product description"].text
    );
    cy.get('[name="description"]').check();
    cy.get('[id="button-search"]').click();
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-9: Validate Search by selecting the category of product", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get('[id="input-search"]').type(src["product 1"].product);
    cy.get('[name="category_id"]')
      .select("27")
      .contains(src["dropdown options"].option1);
    cy.get('[id="button-search"]').click();
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[name="category_id"]')
      .select("26")
      .contains(src["dropdown options"].option2);
    cy.get('[id="button-search"]').click();
    cy.get("p").eq(2).should("contain", src["non existing product"].message);
  });

  it("TC-10: Validate Search by selecting  to search in subcategories", () => {
    cy.get('[id="search"]').type("{enter}");
    cy.get('[id="input-search"]').type(src["product 1"].product);
    cy.get('[name="category_id"]')
      .select("20")
      .contains(src["dropdown options"]["parent category"]);
    cy.get('[id="button-search"]').click();
    cy.get("p").eq(2).should("contain", src["non existing product"].message);
    cy.get('[name="sub_category"]').check();
    cy.get('[id="button-search"]').click();
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
  });

  it("TC-11: Validate List and Grid views when only one Product is displayed in the search results", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[id="list-view"]').click();
    cy.get('[class="caption"]')
      .contains(src["product 1"].product)
      .should("have.length", 1);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
    cy.get('[name="search"]').clear();
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[id="grid-view"]').click();
    cy.get('[class="caption"]')
      .contains(src["product 1"].product)
      .should("have.length", 1);
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
  });

  it("TC-12: Validate List and Grid views when multiple Products are displayed in the search results", () => {
    cy.get('[id="search"]').type(src["product 2"].product + "{enter}");
    cy.get('[class="row"]').should("have.length.gt", 1);
    cy.get('[id="list-view"]').click();
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
    cy.get('[name="search"]').clear();
    cy.get('[id="search"]').type(src["product 2"].product + "{enter}");
    cy.get('[class="row"]').should("have.length.gt", 1);
    cy.get('[id="grid-view"]').click();
    cy.get('[class="caption"]').contains(src["product 1"].product).click();
    cy.get("h1").contains(src["product 1"].product).should("be.visible");
  });

  it("TC-13: Validate navigating to Product Compare Page from Search Results page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[data-original-title="Compare this Product"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(src["product compare"]["success msg"])
      .should("be.visible");
    cy.get('[href="https://awesomeqa.com/ui/index.php?route=product/compare"]')
      .eq(1)
      .click();
    cy.get("h1").contains(src["product compare"].heading).should("be.visible");
  });

  it("TC-14: Validate User is able to sort the Products displayed in the Search Results", () => {
    cy.get('[id="search"]').type(src["product 2"].product + "{enter}");
    cy.get('[class="row"]').should("have.length.gt", 1);
    cy.get('[id="input-sort"]').select(src["product sort"].sort1);
    cy.get(
      '[class="product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12"]'
    )
      .eq(0)
      .contains(src["product 1"].product);
    cy.get(
      '[class="product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12"]'
    )
      .eq(1)
      .contains(src["product sort"].product);
    cy.get('[id="input-sort"]').select(src["product sort"].sort2);
    cy.get(
      '[class="product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12"]'
    )
      .eq(0)
      .contains(src["product sort"].product2);
    cy.get(
      '[class="product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12"]'
    )
      .eq(1)
      .contains(src["product sort"].product3);
  });

  it("TC-15: Validate the User can select how many produts can be displayed in the Search Results", () => {
    cy.get('[id="search"]').type(src["product 2"].product + "{enter}");
    cy.get('[class="row"]').should("have.length.gt", 1);
    cy.get('[id="input-limit"]').select("25");
  });

  it("TC-16: Validate navigating to Search page from the Site Map page", () => {
    cy.get('[class="list-unstyled"]')
      .contains(src["site map"].sm)
      .scrollIntoView({ duration: 1000 })
      .click();
    cy.get('[class="col-sm-6"]').contains(src.placeholders.search).click();
    cy.get('[id="content"]')
      .contains(src.placeholders.search)
      .should("exist")
      .and("be.visible");
  });

  it("TC-17: Validate the breadcrumb, Page Heading, Page Title and Page URL of 'Search' page", () => {
    cy.get('[id="search"]').type(src["product 1"].product + "{enter}");
    cy.get('[class="caption"]').should("contain", src["product 1"].product);
    cy.get('[class="breadcrumb"]').should("contain", src.placeholders.search);
    cy.get("h1").should(
      "contain",
      src.placeholders.search + " - " + src["product 1"].product
    );
    cy.url().should(
      "eq",
      "https://awesomeqa.com/ui/index.php?route=product/search&search=" +
        src["product 1"].product
    );
    cy.title().should(
      "eq",
      src.placeholders.search + " - " + src["product 1"].product
    );
  });
});
