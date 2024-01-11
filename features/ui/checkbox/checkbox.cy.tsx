import React from "react";
import { Checkbox } from "./checkbox";

describe("<Checkbox />", () => {
  it("onChange is called when clicking the label", () => {
    // see: https://on.cypress.io/mounting-react
    const onChange = cy.stub();
    cy.mount(<Checkbox onChange={onChange} />);
    cy.get("label")
      .click()
      .then(() => {
        expect(onChange).to.be.calledWithMatch({ target: { checked: true } });
      });
  });

  it("onChange is called when pressing the space key", () => {
    const onChange = cy.stub();
    cy.mount(<Checkbox onChange={onChange} />);
    cy.get("label")
      .type(" ")
      .then(() => {
        expect(onChange).to.be.calledOnce;
      });
  });

  it("supports the checked prop", () => {
    cy.mount(<Checkbox checked={false} onChange={() => {}} />).then(
      ({ rerender }) => {
        cy.get("input[type='checkbox']").should("not.be.checked");
        cy.get("svg[data-testid=check]").should("not.be.visible");

        rerender(<Checkbox checked={true} onChange={() => {}} />);
        cy.get("input[type='checkbox']").should("be.checked");
        cy.get("svg[data-testid=check]").should("be.visible");
      },
    );
  });

  it("supports the indeterminate prop", () => {
    cy.mount(<Checkbox indeterminate={true} />).then(({ rerender }) => {
      cy.get("input[type='checkbox']:indeterminate").should("exist");
      cy.get("svg[data-testid=indeterminate-check]").should("be.visible");

      rerender(<Checkbox indeterminate={false} />);
      cy.get("input[type='checkbox']:indeterminate").should("not.exist");
      cy.get("svg[data-testid=indeterminate-check]").should("not.be.visible");
    });
  });
});
