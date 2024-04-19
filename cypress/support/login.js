import * as log from "../fixtures/TS_002_Login.json";
import * as reg from "../fixtures/TS_001_Register.json";
import { Cryptography } from "../support/cryptography";

export function login() {
  cy.get('[title="My Account"]').click();
  cy.get('[class="dropdown-menu dropdown-menu-right"]')
    .contains(log["before each"].login)
    .should("be.visible")
    .click();
  cy.get('[class="well"]')
    .contains(log["before each"].logwin)
    .should("be.visible");
  cy.get('[id="input-email"]').type(reg.fields.email);
  cy.get('[id="input-password"]').type(Cryptography.decrypt(reg.fields.pass), {
    log: false,
  });
  cy.get('[type="submit"]').click();
  cy.get('[id="content"]')
    .contains(reg["created acc"].myacc)
    .should("be.visible");
}
