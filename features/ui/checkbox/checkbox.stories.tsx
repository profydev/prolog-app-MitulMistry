import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxSizeClass, CheckboxState } from "./checkbox";

// Storybook CSF3 format

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { disabled: false },
  // argTypes: {
  //   color: {
  //     control: "select",
  //     options: Object.values(ButtonColor),
  //   },
  // },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, sizeClass: CheckboxSizeClass.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, sizeClass: CheckboxSizeClass.Medium },
};

export const Checked: Story = {
  ...Default,
  args: { ...Default.args, state: CheckboxState.Checked },
};

export const Unchecked: Story = {
  ...Default,
  args: { ...Default.args, state: CheckboxState.Unchecked },
};

export const PartlyChecked: Story = {
  ...Default,
  args: { ...Default.args, state: CheckboxState.PartlyChecked },
};
