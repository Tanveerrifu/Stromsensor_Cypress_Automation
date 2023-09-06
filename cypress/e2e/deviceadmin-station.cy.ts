import "cypress-keycloak";

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

    // This should be replaced once the element has an ID in deviceadmin
    cy.get('#cdk-accordion-child-0 > .mat-expansion-panel-body > :nth-child(2) > span').click();

    const stationName = "Sriganesh";
    const stationId = "MYGOD-E-UST-259";
    const street = "Zeppelinstraße";
    const houseNumber = getRandomInt(1, 100);
    const zipCode = "76185";
    const city = "Karlsruhe";
    const country = "Germany";
    const sensorID = "259916A76913C2EE";
    const routerId = "B06289070202";

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

    clickOn("#getPositionButton");

    //configure
    cy.contains("Abgänge konfigurieren").click();
    clickOn("#hinweiseSelect");
    cy.contains("Oberer Schwellwert in A").click();

    cy.contains(" + ").click();
    type('[formcontrolname="outletLabel"]', "100");

    //save config

    clickOn("#saveAddButton");

    //check save status
    clickOn("#mat-expansion-panel-header-0");
    cy.get(
      '[data-placeholder="Suche nach Stationsnummer / Stationsname / Gateway-ID / Adresse"]'
    )
      .type(`${stationName}{enter}`)
      .wait(13000);
    cy.get(
      '[data-placeholder="Suche nach Stationsnummer / Stationsname / Gateway-ID / Adresse"]'
    ).type("{enter}");

    //check station

    cy.get(".mat-row-link").click();

    //giving sensor id and router id
    type('[formcontrolname="routerId"]', routerId);
    clickOn("#mat-tab-label-2-1");
    type('[formcontrolname="sensorId"]', sensorID);

    //updating
    clickOn("#updateStationButton");

    // cy.contains(stationName).click();

    //delete station
    // clickOn(":nth-child(6) > .mat-focus-indicator");
    // cy.xpath("//span[normalize-space()='Ja']").click();
  });

  it("click iq", () => {
    cy.visit("https://test-iq.smight-mgt.de/").wait(5000);
    cy.get('[data-cy="overview-gdpr-button"] > .mdc-button__label').click().wait(5000);
    type("#mat-input-0","AHTET-E-UST-021");

  });

});
