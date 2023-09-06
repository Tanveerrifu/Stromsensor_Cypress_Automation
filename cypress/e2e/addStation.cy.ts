import "cypress-file-upload";
import "cypress-keycloak";

import { clickOn, type } from "../helpers/cypress-utils";

const filePath = "MAS_TEST_Nutzerimport_5.xlsx";
const password = "IaufjGu?cvn9swm6kTlUBA0iy";

describe("DeviceAdmin", () => {
  beforeEach(() => {
    cy.login({
      root: Cypress.env("KEYCLOAK_HOST"),
      realm: Cypress.env("KEYCLOAK_REALM"),
      username: Cypress.env("KEYCLOAK_USER"),
      password: Cypress.env("KEYCLOAK_PASSWORD"),
      path_prefix: "",
      client_id: Cypress.env("KEYCLOAK_CLIENT_ID"),
      redirect_uri: Cypress.env("KEYCLOAK_REDIRECT_URI"),
    });

    cy.visit(Cypress.env("DEVICEADMIN_URL")).wait(5000);
  });
  it("Upload File", () => {
    clickOn('#cdk-accordion-child-0 > .mat-expansion-panel-body > :nth-child(3) > span');
    cy.get('input[type="file"]').attachFile(filePath, { force: true });
    cy.contains('Stationsdaten hochladen').click();
    cy.get('[type="button"]>.mat-button-wrapper').click();



    //for import settings
    // cy.get(
    //   "#cdk-accordion-child-1 > .mat-expansion-panel-body > :nth-child(3) > span"
    // ).click();
    // cy.get('input[type="file"]').attachFile(filePath, { force: true });
    // type('[formcontrolName="initialPassword"]', password);
    // //cy.get(".grid-template-download").click();
    // cy.contains('Nutzerdaten hochladen').click();
    // cy.get('[type="button"]>.mat-button-wrapper').click();
  });
});
