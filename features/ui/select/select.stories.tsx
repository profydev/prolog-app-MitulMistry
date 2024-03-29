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
    options: [
      { label: "Item 1", value: 1 },
      { label: "Item 2", value: 2 },
      { label: "Item 3", value: 3 },
    ],
    disabled: false,
  },
};

export const Label: Story = {
  ...Default,
  args: { ...Default.args, children: "Label" },
};

export const Icon: Story = {
  ...Default,
  args: {
    ...Label.args,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3154 14.1014 15.6903 13.4763C15.0652 12.8512 14.2173 12.5 13.3333 12.5H6.66658C5.78253 12.5 4.93468 12.8512 4.30956 13.4763C3.68444 14.1014 3.33325 14.9493 3.33325 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 9.99992 9.16667C8.15897 9.16667 6.66658 7.67428 6.66658 5.83333C6.66658 3.99238 8.15897 2.5 9.99992 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333Z"
          stroke="#667085"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export const Hint: Story = {
  ...Default,
  args: { ...Label.args, hint: "This is a hint." },
};

export const Error: Story = {
  ...Default,
  args: { ...Label.args, errorMessage: "This is an error message." },
};
