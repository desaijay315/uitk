import { forwardRef, ReactNode } from "react";
import classnames from "classnames";
import { makePrefixer, Button, ButtonProps } from "@jpmorganchase/uitk-core";
import { ChevronDownIcon } from "@jpmorganchase/uitk-icons";
import "./MenuButtonTrigger.css";

const withBaseName = makePrefixer("uitkMenuButtonTrigger");

export interface MenuButtonTriggerProps extends ButtonProps {
  className?: string;
  hideCaret?: boolean;
  isMenuOpen?: boolean;
  children?: ReactNode;
}

export const MenuButtonTrigger = forwardRef<
  HTMLButtonElement,
  MenuButtonTriggerProps
>(function MenuButtonTrigger(
  { className, hideCaret, isMenuOpen, children, ...rest },
  ref
) {
  return (
    <Button
      ref={ref}
      className={classnames(withBaseName(), className, {
        [withBaseName("buttonOpen")]: isMenuOpen,
      })}
      data-testid="menu-button-trigger"
      {...rest}
    >
      {children}
      {!hideCaret && (
        <ChevronDownIcon
          className={withBaseName("caretIcon")}
          data-testid="menu-button-trigger-caret"
        />
      )}
    </Button>
  );
});
