import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
// import { Checkbox, CheckboxSizeClass, CheckboxState } from "./checkbox";
import { Checkbox } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { children: "Label", checked: false },
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
  // args: { disabled: false },
  // argTypes: {
  //   color: {
  //     control: "select",
  //     options: Object.values(ButtonColor),
  //   },
  // },
};

// export const Small: Story = {
//   ...Default,
//   args: { ...Default.args, sizeClass: CheckboxSizeClass.Small },
// };

// export const Medium: Story = {
//   ...Default,
//   args: { ...Default.args, sizeClass: CheckboxSizeClass.Medium },
// };

// export const Checked: Story = {
//   ...Default,
//   args: { ...Default.args, state: CheckboxState.Checked },
// };

// export const Unchecked: Story = {
//   ...Default,
//   args: { ...Default.args, state: CheckboxState.Unchecked },
// };

// export const PartlyChecked: Story = {
//   ...Default,
//   args: { ...Default.args, state: CheckboxState.PartlyChecked },
// };
