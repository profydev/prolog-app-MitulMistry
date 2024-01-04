import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

// Storybook CSF3 format

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA" },
};
