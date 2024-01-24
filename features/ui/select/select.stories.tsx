import { Meta, StoryObj } from "@storybook/react";
import { Select } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    children: <>Label</>,
    options: [
      { label: "Item 1", value: 1 },
      { label: "Item 2", value: 2 },
      { label: "Item 3", value: 3 },
    ],
    disabled: false,
  },
};
