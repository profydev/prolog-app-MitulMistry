import React from "react";

export type AlertIconProps = {
  src: string;
};

export function AlertIcon({ src }: AlertIconProps) {
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={src} alt="" />;
}
