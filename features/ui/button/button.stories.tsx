import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from "./button";

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
