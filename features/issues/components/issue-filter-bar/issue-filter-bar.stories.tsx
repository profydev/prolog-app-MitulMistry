import { Meta, StoryObj } from "@storybook/react";
import { IssueFilterBar } from ".";

// Storybook CSF3 format

const meta: Meta<typeof IssueFilterBar> = {
  title: "UI/IssueFilterBar",
  component: IssueFilterBar,
};
export default meta;

type Story = StoryObj<typeof IssueFilterBar>;

// Default is uncontrolled component
export const Default: Story = {
  args: {
    disabled: false,
  },
};
