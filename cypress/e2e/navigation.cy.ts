describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("nav")
        .contains("Projects")
        .should("have.attr", "href", "/dashboard");

      cy.get("nav")
        .contains("Issues")
        .should("have.attr", "href", "/dashboard/issues");

      // Actually clicks link and checks it works, vs. just checking for existence
      // of link. More thorough, but this refactoring might lead to test bloat.
      // cy.get("nav").contains("Issues").click();
      // cy.url().should("eq", "http://localhost:3000/dashboard/issues");
      // cy.get("h1").contains("Issues");

      cy.get("nav")
        .contains("Alerts")
        .should("have.attr", "href", "/dashboard/alerts");

      cy.get("nav")
        .contains("Users")
        .should("have.attr", "href", "/dashboard/users");

      cy.get("nav")
        .contains("Settings")
        .should("have.attr", "href", "/dashboard/settings");

      cy.get("nav")
        .contains("Support")
        .should(
          "have.attr",
          "href",
          "mailto:support@prolog-app.com?subject=Support Request: ",
        );
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get("nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get("nav").find("a").should("have.length", 6).eq(1).click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get("nav").contains("Issues").should("not.exist");
    });

    it("displays large logo when switching to landscape mode while navigation is collapsed", () => {
      // collapse navigation
      cy.get("nav").contains("Collapse").click();

      // check that small logo is show
      cy.get("header")
        .find("img[src='/icons/logo-small.svg']")
        .should("be.visible");
      cy.get("header")
        .find("img[src='/icons/logo-large.svg']")
        .should("not.be.visible");

      // switch to landscape mode that uses the mobile menu
      cy.viewport(900, 1025);

      // check that large logo is shown
      cy.get("header")
        .find("img[src='/icons/logo-small.svg']")
        .should("not.be.visible");
      cy.get("header")
        .find("img[src='/icons/logo-large.svg']")
        .should("be.visible");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("nav");

      // check that all links are rendered
      cy.get("nav").find("a").should("have.length", 6);

      // Support button should be rendered but Collapse button not
      cy.get("nav").contains("Support").should("exist");
      cy.get("nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("nav");
    });
  });
});
