import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from "./button";
import { ButtonIcon } from "./button-icon";

// Storybook CSF3 format

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA", disabled: false },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(ButtonColor),
    },
  },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Large },
};

export const XLarge: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.XLarge },
};

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Primary },
};

export const Secondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Secondary },
};

export const Gray: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Gray },
};

export const Error: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Error },
};

export const PrimaryEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Primary,
    variant: ButtonVariant.Empty,
  },
};

export const SecondaryEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Secondary,
    variant: ButtonVariant.Empty,
  },
};

export const GrayEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Gray,
    variant: ButtonVariant.Empty,
  },
};

export const ErrorEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Error,
    variant: ButtonVariant.Empty,
  },
};

export const IconLeading: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        <ButtonIcon src="/icons/message.svg" />
        Button CTA
      </>
    ),
  },
};

// Alternative render function:
// render: (args) => (
//   <Button {...args}>
//     <ButtonIcon src="/icons/message.svg" />
//     Button CTA
//   </Button>
// ),

export const IconTrailing: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        Button CTA
        <ButtonIcon src="/icons/message.svg" />
      </>
    ),
  },
};

export const IconOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: <ButtonIcon src="/icons/message.svg" />,
    variant: ButtonVariant.IconOnly,
  },
};
