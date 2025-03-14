import { forwardRef, ReactNode, useCallback, useState } from "react";
import { ButtonProps } from "@jpmorganchase/uitk-core";
import { CascadingMenu, CascadingMenuProps } from "../cascading-menu";
import { MenuButtonTrigger } from "./MenuButtonTrigger";

export interface MenuButtonProps extends ButtonProps {
  CascadingMenuProps: CascadingMenuProps;
  children: ReactNode;
  className?: string;
  hideCaret?: boolean;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(
    { variant = "secondary", CascadingMenuProps = {}, children, ...restProps },
    ref
  ) {
    const {
      initialSource = { menuItems: [] },
      onOpen,
      onClose,
      ...restMenuProps
    } = CascadingMenuProps;

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleOpen = useCallback(() => {
      setMenuOpen(true);
      onOpen && onOpen();
    }, [onOpen]);

    const handleClose = useCallback(() => {
      setMenuOpen(false);
      onClose && onClose();
    }, [onClose]);

    return (
      <CascadingMenu
        initialSource={initialSource}
        onClose={handleClose}
        onOpen={handleOpen}
        {...restMenuProps}
      >
        <MenuButtonTrigger
          aria-expanded={isMenuOpen}
          aria-haspopup
          isMenuOpen={isMenuOpen}
          ref={ref}
          variant={variant}
          {...restProps}
        >
          {children}
        </MenuButtonTrigger>
      </CascadingMenu>
    );
  }
);
