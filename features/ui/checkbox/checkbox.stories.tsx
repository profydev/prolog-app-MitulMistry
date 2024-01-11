import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
// import { Checkbox, CheckboxSizeClass, CheckboxState } from "./checkbox";
import { Checkbox, CheckboxSize } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: "Label",
    checked: false,
    indeterminate: false,
    size: CheckboxSize.Medium,
    disabled: false,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => updateArgs({ checked: e.target.checked })}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: { children: "Label", indeterminate: false },
};
