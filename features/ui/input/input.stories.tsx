import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Input } from ".";

// Storybook CSF3 format

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

// Default is uncontrolled component
export const Default: Story = {
  args: {
    children: "Label",
    placeholder: "olivia@untitledui.com",
    disabled: false,
  },
};

export const Controlled: Story = {
  ...Default,
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => updateArgs({ value: e.target.value })}
        ref={(ref) => console.log(ref)}
      />
    );
  },
};

export const Hint: Story = {
  ...Default,
  args: {
    ...Default.args,
    hint: "This is a hint",
  },
};

export const Icon: Story = {
  ...Default,
  args: {
    ...Default.args,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M18.3332 5C18.3332 4.08334 17.5832 3.33334 16.6665 3.33334H3.33317C2.4165 3.33334 1.6665 4.08334 1.6665 5M18.3332 5V15C18.3332 15.9167 17.5832 16.6667 16.6665 16.6667H3.33317C2.4165 16.6667 1.6665 15.9167 1.6665 15V5M18.3332 5L9.99984 10.8333L1.6665 5"
          stroke="#667085"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export const Error: Story = {
  ...Default,
  args: {
    ...Icon.args,
    errorMessage: "This is an error message.",
  },
};
