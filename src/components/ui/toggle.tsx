"use client";

import { Toggle as BaseToggle, type ToggleState } from "@base-ui/react/toggle";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const toggle = tv({
  slots: {
    track: [
      "group",
      "relative inline-block h-5.5 w-10 rounded-full",
      "transition-colors duration-150",
      "data-[state=on]:bg-accent-green",
      "data-[state=off]:bg-border-primary",
    ],
    thumb: [
      "absolute top-1/2 left-[3px] -translate-y-1/2",
      "size-4 rounded-full bg-white",
      "transition-transform duration-150",
      "transform",
      "group-data-[state=on]:translate-x-[18px]",
      "group-data-[state=off]:translate-x-0",
    ],
  },
});

type ToggleProps = ComponentProps<typeof BaseToggle>;

function Toggle({ className, pressed, ...props }: ToggleProps) {
  const { track, thumb } = toggle();

  return (
    <BaseToggle
      className={(state: ToggleState) => {
        const parentClasses =
          typeof className === "function" ? className(state) : className;
        return track({ className: parentClasses });
      }}
      data-state={pressed ? "on" : "off"}
      pressed={pressed}
      {...props}
    >
      <span className={thumb()} />
    </BaseToggle>
  );
}

export { Toggle, type ToggleProps, toggle };
