import { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Label: Story = {
  args: {
    ...Default.args,
    children: "Label",
  },
};

export const Hint: Story = {
  args: {
    ...Label.args,
    hint: "This is a hint",
  },
};

export const Placeholder: Story = {
  args: {
    ...Hint.args,
    placeholder: "This is a placeholder",
  },
};
