import * as log from "../fixtures/TS_002_Login.json";
import * as fgt from "../fixtures/TS_004_Forgot Password.json";

describe("Validate the working of Forgot Password functionality", () => {
  beforeEach(() => {
    cy.visit("https://awesomeqa.com/ui/index.php?route=common/home");
    cy.get('[title="TheTestingAcademy eCommerce"]').should(
      "have.attr",
      "src",
      "https://awesomeqa.com/ui/image/catalog/opencart-logo.png"
    );
  });

  it("TC-1: Validate User is able to reset the password", () => {
    cy.get('[title="My Account"]').click();
    cy.get('[class="dropdown-menu dropdown-menu-right"]')
      .contains(log["before each"].login)
      .should("be.visible")
      .click();
    cy.get('[class="well"]')
      .contains(log["before each"].logwin)
      .should("be.visible");

    // Click "Forgot Password"
    cy.get(
      '[href="https://awesomeqa.com/ui/index.php?route=account/forgotten"]'
    )
      .contains(fgt["forgot password"].link)
      .click();
    cy.get("h1").contains(fgt["forgot password"].heading).should("be.visible");
    cy.get('[id="input-email"]').type(fgt["existing acc"].mail);
    cy.get('[type="submit"]').click();
    cy.get('[class="alert alert-success alert-dismissible"]')
      .contains(fgt["forgot password"].success)
      .should("be.visible");

    // Check your mail
    cy.visit("https://mail.google.com/mail/");
    cy.get('[type="email"]').type(fgt["existing acc"].mail)
    cy.get('[class="VfPpkd-vQzf8d"]').contains('Next').click()
    cy.get('[type="password"]').type(fgt["existing acc"].pass)
    cy.get('[class="VfPpkd-vQzf8d"]').contains('Next').click()

    // There's no e-mail sent after clicking the "Forgot Password" link - REPORT DEFECT!!!!
  });
});
