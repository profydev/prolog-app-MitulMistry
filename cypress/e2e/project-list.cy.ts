import { ProjectStatus } from "@api/projects.types";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  it("shows a loading indicator", () => {
    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // check that the loading indicator is shown
    cy.get("[data-testid='loading-indicator']").should("be.visible");

    // check that the loading indicator does not exist after loading
    cy.get("[data-testid='project-list']").should("be.visible");
    cy.get("[data-testid='loading-indicator']").should("not.exist");
  });

  it("shows an error message", () => {
    // setup request mock
    cy.intercept(
      { url: "https://prolog-api.profy.dev/project", times: 4 },
      {
        statusCode: 500,
      },
    );

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // check that the error message is shown
    cy.get("[data-testid='projects-error-message']", { timeout: 15000 })
      .should("be.visible")
      // click retry button
      .find("button")
      .click();

    cy.get("[data-testid='project-list']").should("be.visible");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      // setup request mock
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      });
      // }).as("getProjects");

      cy.viewport(1025, 900);

      // open projects page
      cy.visit("http://localhost:3000/dashboard");

      // wait for request to resolve
      // cy.wait("@getProjects");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusToText = {
        [ProjectStatus.info]: "Stable",
        [ProjectStatus.warning]: "Warning",
        [ProjectStatus.error]: "Critical",
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          const status = mockProjects[index].status as ProjectStatus;
          cy.wrap($el).contains(statusToText[status]);
          cy.wrap($el)
            .find("a")
            .should(
              "have.attr",
              "href",
              `/dashboard/issues?${new URLSearchParams({
                project: mockProjects[index].name,
              })}`,
            );
        });
    });
  });
});
