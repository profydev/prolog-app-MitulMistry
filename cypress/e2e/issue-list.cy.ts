import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  it("shows a loading indicator", () => {
    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // check that the loading indicator is shown
    cy.get("[data-testid='loading-indicator']").should("be.visible");

    // check that the loading indicator does not exist after loading
    cy.get("[data-testid='issue-list']").should("be.visible");
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
    cy.visit("http://localhost:3000/dashboard/issues");

    // check that the error message is shown
    cy.get("[data-testid='issues-error-message']", { timeout: 15000 })
      .should("be.visible")
      // click retry button
      .find("button")
      .click();

    cy.get("[data-testid='issue-list']").should("be.visible");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      // setup request mocks
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
        fixture: "issues-page-1.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
        fixture: "issues-page-2.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
        fixture: "issues-page-3.json",
      });

      // cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      //   fixture: "projects.json",
      // }).as("getProjects");
      // cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      //   fixture: "issues-page-1.json",
      // }).as("getIssuesPage1");
      // cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      //   fixture: "issues-page-2.json",
      // }).as("getIssuesPage2");
      // cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      //   fixture: "issues-page-3.json",
      // }).as("getIssuesPage3");

      cy.viewport(1025, 900);

      // open issues page
      cy.visit(`http://localhost:3000/dashboard/issues`);

      // wait for request to resolve
      // cy.wait(["@getProjects", "@getIssuesPage1"]);
      // cy.wait(500);

      // set button aliases
      // cy.get("button").contains("Previous").as("prev-button");
      // cy.get("button").contains("Next").as("next-button");

      // set button aliases
      cy.get("button").contains("Previous").as("prev-button");
      cy.get("button").contains("Next").as("next-button");
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test that page persists after reload
      cy.reload();
      // wait for loading to finish
      cy.get("[data-testid='issue-list']").should("be.visible");
      cy.get("[data-testid='loading-indicator']").should("not.exist");
      // cy.wait(["@getProjects", "@getIssuesPage2"]);
      // cy.wait(1500);
      cy.contains("Page 2 of 3");
    });

    it("filters by status", () => {
      cy.intercept(
        "GET",
        "https://prolog-api.profy.dev/issue?page=1&status=open",
      ).as("getIssuesWithStatusOpen");

      // Verify that the status filter is stored in the URL and that only issues with status open are shown
      cy.get("[data-testid='status-filter']").click();
      cy.get("[data-key='open'").click();
      cy.url().should("include", "status=open");
      cy.wait("@getIssuesWithStatusOpen");
      // Doesn't have "Open" label, so have to check response body instead
      cy.get("@getIssuesWithStatusOpen")
        .its("response.body.items")
        .each((issue) => {
          expect(issue).to.have.property("status", "open");
        });

      // Verify that status filter is persisted after page reload
      cy.reload();
      cy.get("[data-testid='status-filter']").contains("Open");
      cy.url().should("include", "status=open");
      // Doesn't have "Open" label, so have to check response body instead
      cy.get("@getIssuesWithStatusOpen")
        .its("response.body.items")
        .each((issue) => {
          expect(issue).to.have.property("status", "open");
        });

      // Verify that the status filter can be reset
      cy.get("[data-testid='status-filter']").click();
      cy.get("[data-key='SELECT_RESET_OPTION_VALUE'").click();
      cy.url().should("not.include", "status=open");
    });

    it("filters by level", () => {
      cy.intercept(
        "GET",
        "https://prolog-api.profy.dev/issue?page=1&level=error",
      ).as("getIssuesWithLevelError");

      // Verify that the level filter is stored in the URL and that only issues with level error are shown
      cy.get("[data-testid='level-filter']").click();
      cy.get("[data-key='error'").click();
      cy.url().should("include", "level=error");
      cy.wait("@getIssuesWithLevelError");
      // Make sure all issues have label "Error"
      cy.get("table tbody tr td:nth-child(2)").each(($el) => {
        cy.wrap($el).contains("Error");
      });

      // Verify that level filter is persisted after page reload
      cy.reload();
      cy.get("[data-testid='level-filter']").contains("Error");
      cy.url().should("include", "level=error");
      cy.wait("@getIssuesWithLevelError");
      // Make sure all issues have label "Error"
      cy.get("table tbody tr td:nth-child(2)").each(($el) => {
        cy.wrap($el).contains("Error");
      });

      // Verify that the level filter can be reset
      cy.get("[data-testid='level-filter']").click();
      cy.get("[data-key='SELECT_RESET_OPTION_VALUE'").click();
      cy.url().should("not.include", "level=error");
    });

    it("filters by project name", () => {
      cy.intercept(
        "GET",
        "https://prolog-api.profy.dev/issue?page=1&project=Frontend",
      ).as("getIssuesWithProjectFrontend");

      // Verify that the project filter is stored in the URL and that only issues with project frontend are shown
      cy.get("[data-testid='project-filter']").type("Frontend", { delay: 50 });
      cy.url().should("include", "project=Frontend");
      cy.get("@getIssuesWithProjectFrontend")
        .its("response.body.items")
        .each((issue) => {
          expect(issue).to.have.property(
            "projectId",
            "6d5fff43-d691-445d-a41a-7d0c639080e6",
          );
        });

      // Verify that project filter is persisted after page reload
      cy.reload();
      cy.get("[data-testid='project-filter']").type("Frontend");
      cy.url().should("include", "project=Frontend");
      cy.get("@getIssuesWithProjectFrontend")
        .its("response.body.items")
        .each((issue) => {
          expect(issue).to.have.property(
            "projectId",
            "6d5fff43-d691-445d-a41a-7d0c639080e6",
          );
        });

      // Verify that the project filter can be reset
      cy.get("[data-testid='project-filter']").clear();
      cy.url().should("not.include", "project=Frontend");
    });

    // it("persists page after reload", () => {
    //   cy.get("@next-button").click();
    //   cy.contains("Page 2 of 3");

    //   cy.reload();
    //   // wait for loading to finish
    //   cy.get("[data-testid='issue-list']").should("be.visible");
    //   cy.get("[data-testid='loading-indicator']").should("not.exist");
    //   // cy.wait(["@getProjects", "@getIssuesPage2"]);
    //   // cy.wait(1500);
    //   cy.contains("Page 2 of 3");
    // });
  });
});
