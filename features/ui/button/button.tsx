import React from "react";
import { UnstyledButton } from "./unstyled-button";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <UnstyledButton {...props} />;
}
