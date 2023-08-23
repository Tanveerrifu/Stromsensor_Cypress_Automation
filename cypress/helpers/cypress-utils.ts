export function clickOn(element: string) {
  cy.get(element).click();
}

export function type(element: string, text: string) {
  cy.get(element).type(text);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
