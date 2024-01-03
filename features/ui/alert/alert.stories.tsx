import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Alert, AlertIcon, AlertMessage, AlertButton } from ".";

export default {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = () => (
  <Alert>
    <AlertIcon src="/icons/alert-circle.svg" />
    <AlertMessage>
      There was a problem while loading the project data
    </AlertMessage>
    <AlertButton onClick={() => alert("Try again")}>
      Try again
      <AlertIcon src="/icons/arrow-right.svg" />
    </AlertButton>
  </Alert>
);

export const Default = Template.bind({});
Default.parameters = {
  viewMode: "docs",
};
