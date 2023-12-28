import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { LoadingIndicator } from "./loading-indicator";

export default {
  title: "UI/LoadingIndicator",
  component: LoadingIndicator,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof LoadingIndicator>;

const Template: StoryFn<typeof LoadingIndicator> = () => <LoadingIndicator />;

export const Default = Template.bind({});
Default.parameters = {
  viewMode: "docs",
};
