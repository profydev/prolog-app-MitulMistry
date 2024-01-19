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
    children: (
      <>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </>
    ),
    disabled: false,
  },
};
