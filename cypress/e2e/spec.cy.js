describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      fixture: "mockOrders",
    }).as("mockOrders");

    cy.visit("/");
  });

  it("should display correct page on load", () => {
    cy.wait("@mockOrders").then((order) => {
      cy.get("form").should("have.length", 1);
      cy.get("form input").should("have.length", 1);
      cy.getTestId("ingredient-button").should("have.length", 12);
      cy.getTestId("ingredient-button").first().contains("beans");
      cy.getTestId("ingredient-button").last().contains("sour cream");
      cy.getTestId("form-submit-button").contains("Submit Order");

      cy.get(".order").should("have.length", 3);

      cy.get(".order").first().contains("These");
      cy.get(".order").first().find("li").should("have.length", 5);
      cy.get(".order").first().find("li").first().contains("beans");
      cy.get(".order").first().find("li").last().contains("jalapeno");

      cy.get(".order").last().contains("Mock");
      cy.get(".order").last().find("li").should("have.length", 5);
      cy.get(".order").last().find("li").first().contains("sofritas");
      cy.get(".order").last().find("li").last().contains("queso fresco");
    });
  });

  it("should be able to add a new order", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      body: {
        id: 4,
        name: "Charlie",
        ingredients: ["beans", "queso fresco", "beans"],
      },
    }).as("mockPost");

    cy.get("form input").type("Charlie");
    cy.get("form button").then((buttons) => {
      cy.wrap(buttons).eq(0).click();
      cy.wrap(buttons).eq(5).click();
      cy.wrap(buttons).eq(0).click();
    });
    cy.getTestId("form-submit-button").click();

    cy.wait("@mockPost").then((post) => {
      cy.get(".order").should("have.length", 4);

      cy.get(".order").first().contains("These");
      cy.get(".order").first().find("li").should("have.length", 5);
      cy.get(".order").first().find("li").first().contains("beans");
      cy.get(".order").first().find("li").last().contains("jalapeno");

      cy.get(".order").last().contains("Charlie");
      cy.get(".order").last().find("li").should("have.length", 3);
      cy.get(".order").last().find("li").first().contains("beans");
      cy.get(".order").last().find("li").last().contains("beans");
    });
  });

  it("should not be able to submit without name or ingredients", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      body: {
        id: 4,
        name: "Charlie",
        ingredients: ["beans"],
      },
    }).as("mockPost");

    cy.getTestId("form-submit-button").click();

    cy.get(".order").should("have.length", 3);
    cy.get(".order").first().contains("These");
    cy.get(".order").first().find("li").should("have.length", 5);
    cy.get(".order").first().find("li").first().contains("beans");
    cy.get(".order").first().find("li").last().contains("jalapeno");
    cy.get(".order").last().contains("Mock");
    cy.get(".order").last().find("li").should("have.length", 5);
    cy.get(".order").last().find("li").first().contains("sofritas");
    cy.get(".order").last().find("li").last().contains("queso fresco");

    cy.get("form button").first().click();
    cy.getTestId("form-submit-button").click();

    cy.get(".order").should("have.length", 3);
    cy.get(".order").first().contains("These");
    cy.get(".order").first().find("li").should("have.length", 5);
    cy.get(".order").first().find("li").first().contains("beans");
    cy.get(".order").first().find("li").last().contains("jalapeno");
    cy.get(".order").last().contains("Mock");
    cy.get(".order").last().find("li").should("have.length", 5);
    cy.get(".order").last().find("li").first().contains("sofritas");
    cy.get(".order").last().find("li").last().contains("queso fresco");

    cy.get("form input").type("Charlie");
    cy.getTestId("form-submit-button").click();

    cy.wait("@mockPost").then((post) => {
      cy.get(".order").should("have.length", 4);
      cy.get(".order").first().contains("These");
      cy.get(".order").first().find("li").should("have.length", 5);
      cy.get(".order").first().find("li").first().contains("beans");
      cy.get(".order").first().find("li").last().contains("jalapeno");
      cy.get(".order").last().contains("Charlie");
      cy.get(".order").last().find("li").should("have.length", 1);
      cy.get(".order").last().find("li").contains("beans");
    });
  });

  it("should be able to delete orders", () => {
    cy.intercept("DELETE", "http://localhost:3001/api/v1/orders/3", {
      body: {},
    }).as("mockDelete");

    cy.getTestId("order-remove-button").last().click();

    cy.wait("@mockDelete").then(() => {
      cy.get(".order").should("have.length", 2);
      cy.get(".order").first().contains("These");
      cy.get(".order").first().find("li").should("have.length", 5);
      cy.get(".order").first().find("li").first().contains("beans");
      cy.get(".order").first().find("li").last().contains("jalapeno");
      cy.get(".order").last().contains("Are");
      cy.get(".order").last().find("li").should("have.length", 6);
      cy.get(".order").last().find("li").first().contains("steak");
      cy.get(".order").last().find("li").last().contains("jalapeno");
    });
  });

  it("should be able to only allow max two of a duplicate ingredient", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      body: {
        id: 4,
        name: "Data",
        ingredients: ["beans", "beans", "steak", "steak"],
      },
    }).as("mockPost");

    cy.getTestId("order-display").contains("Order: Nothing selected");

    cy.getTestId("ingredient-button").then((buttons) => {
      cy.wrap(buttons).eq(0).click();
      cy.wrap(buttons).eq(0).click();
      cy.getTestId("order-display").contains("Order: beans, beans");
      cy.wrap(buttons).eq(0).click();
      cy.wrap(buttons).eq(1).click();
      cy.wrap(buttons).eq(1).click();
      cy.getTestId("order-display").contains(
        "Order: beans, beans, steak, steak"
      );
      cy.wrap(buttons).eq(1).click();
    });
    cy.get("form input").type("Data");
    cy.getTestId("form-submit-button").click();

    cy.wait("@mockPost").then(() => {
      cy.get(".order").should("have.length", 4);
      cy.get(".order").first().contains("These");
      cy.get(".order").first().find("li").should("have.length", 5);
      cy.get(".order").first().find("li").first().contains("beans");
      cy.get(".order").first().find("li").last().contains("jalapeno");
      cy.get(".order").last().contains("Data");
      cy.get(".order").last().find("li").should("have.length", 4);
      cy.get(".order").last().find("li").first().contains("beans");
      cy.get(".order").last().find("li").last().contains("steak");
    });
  });
});
