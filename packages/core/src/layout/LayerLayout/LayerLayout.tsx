import { forwardRef, HTMLAttributes, useState, useEffect } from "react";
import cx from "classnames";

import {
  makePrefixer,
  useIsViewportLargerThanBreakpoint,
  usePrevious,
} from "../../utils";

import { Scrim, ScrimProps } from "../../scrim";
import { Breakpoints } from "../../breakpoints";
import "./LayerLayout.css";

export const LAYER_POSITIONS = [
  "center",
  "left",
  "top",
  "right",
  "bottom",
] as const;

export type LayerPositions = typeof LAYER_POSITIONS[number];

export interface LayerLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Disable the scrim.
   */
  disableScrim?: boolean;
  /**
   * Defines the layer position within the screen.
   */
  position?: LayerPositions;
  /**
   * Breakpoint at which the layer will become fullscreen.
   */
  fullScreenAtBreakpoint?: keyof Breakpoints;
  /**
   * Disable all animations.
   */
  disableAnimations?: boolean;
  /**
   * Display or hide the component.
   */
  isOpen?: boolean;
  /**
   * Props to be passed to the Scrim component.
   */
  scrimProps?: Partial<ScrimProps>;
}

const withBaseName = makePrefixer("uitkLayerLayout");

export const LayerLayout = forwardRef<HTMLDivElement, LayerLayoutProps>(
  function LayerLayout(props, ref) {
    const {
      children,
      className,
      disableScrim = false,
      position = "center",
      fullScreenAtBreakpoint = "sm",
      disableAnimations = false,
      scrimProps,
      isOpen = true,
      ...rest
    } = props;

    const previousDisableAnimationsProp = usePrevious(
      disableAnimations,
      [disableAnimations],
      false
    ); // we check the previous value for this prop to prevent the animations from triggering again when it changes

    const [showComponent, setShowComponent] = useState(false);

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if ((!isOpen && disableAnimations) || (!isOpen && !isAnimating)) {
        setShowComponent(false);
      }

      if (isOpen && !showComponent) {
        setShowComponent(true);
      }
    }, [isOpen, showComponent, disableAnimations, isAnimating]);

    const fullScreen = useIsViewportLargerThanBreakpoint(
      fullScreenAtBreakpoint
    );

    const anchored = position !== "center" && !fullScreen;

    const enterAnimation =
      !disableAnimations && isOpen && !previousDisableAnimationsProp;

    const exitAnimation = !disableAnimations && !isOpen;

    const layerLayout = showComponent ? (
      <div
        ref={ref}
        className={cx(withBaseName(), className, {
          [withBaseName("anchor")]: anchored,
          [withBaseName("fullScreen")]: fullScreen,
          [withBaseName(position)]: !fullScreen,
          [withBaseName("enter-animation")]: enterAnimation,
          [withBaseName("exit-animation")]: exitAnimation,
        })}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationEnd={() => {
          if (!isOpen && showComponent) {
            setShowComponent(false);
          }
        }}
        {...rest}
      >
        {children}
      </div>
    ) : null;

    return disableScrim ? (
      layerLayout
    ) : (
      <Scrim
        open={showComponent}
        className={cx("uitkEmphasisMedium", {
          [withBaseName("enter-animation")]: enterAnimation,
          [withBaseName("exit-animation")]: exitAnimation,
        })}
        {...scrimProps}
      >
        {layerLayout}
      </Scrim>
    );
  }
);
