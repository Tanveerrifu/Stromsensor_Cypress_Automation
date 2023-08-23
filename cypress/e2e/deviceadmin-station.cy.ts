import "cypress-keycloak";
import "cypress-xpath";

import { clickOn, getRandomInt, type } from "../helpers/cypress-utils";

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

  it("should add a station to the list", () => {
    clickOn(
      "#mat-expansion-panel-header-0 > .mat-content > .mat-expansion-panel-header-title"
    );

    // This should be replaced once the element has an ID in deviceadmin
    clickOn(
      "#cdk-accordion-child-0 > .mat-expansion-panel-body > :nth-child(2)"
    );

    const stationName = "MYGOD-E-UST-259";
    const stationId = "MYGOD-E-UST-259";
    const street = "Zeppelinstraße";
    const houseNumber = getRandomInt(1, 100);
    const zipCode = "76185";
    const city = "Karlsruhe";
    const country = "Germany";

    type('[formcontrolname="stationName"]', stationName);
    type('[formcontrolname="stationId"]', stationId);
    type('[formcontrolname="street"]', street);
    type('[formcontrolname="houseNumber"]', houseNumber.toString());
    type('[formcontrolname="zipCode"]', zipCode);
    type('[formcontrolname="city"]', city);

    // The country should be preset to Germany
    cy.get('[formcontrolname="country"]').contains(country);

    // The formatted address field should be disabled
    cy.get('[formcontrolname="formattedAddress"]').should("be.disabled");

    cy.get('[formcontrolname="lat"]').should("be.empty");
    cy.get('[formcontrolname="lng"]').should("be.empty");

    cy.xpath(
      "//span[normalize-space()='Position anhand der Adresse ermitteln']"
    ).click();

    //configure
    clickOn("#mat-tab-label-0-1 > .mat-tab-label-content");
    cy.xpath("//div[contains(text(),'+')]").click();
    type('[formcontrolname="outletLabel"]', "100");

    //save config

    clickOn(":nth-child(5) > .mat-focus-indicator");

    //check save status
    clickOn(
      "#mat-expansion-panel-header-0 > .mat-content > .mat-expansion-panel-header-title"
    );
    cy.get(
      '[data-placeholder="Suche nach Stationsnummer / Stationsname / Gateway-ID / Adresse"]'
    )
      .type(`${stationName}{enter}`)
      .wait(3000);
    cy.get(
      '[data-placeholder="Suche nach Stationsnummer / Stationsname / Gateway-ID / Adresse"]'
    ).type("{enter}");
    cy.contains(stationName).click();

    //delete station
    clickOn(":nth-child(6) > .mat-focus-indicator");
    cy.xpath("//span[normalize-space()='Ja']").click();
  });
});
