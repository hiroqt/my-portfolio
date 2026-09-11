"use client";

import { useEffect, useState, useRef } from "react";
import { motion, type Transition } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export type EasingDefinition =
  | [number, number, number, number]
  | "linear"
  | "easeIn"
  | "easeInOut"
  | "easeOut"
  | "circIn"
  | "circInOut"
  | "circOut"
  | "backIn"
  | "backInOut"
  | "backOut"
  | "anticipate"
  | (string & {});

export interface CascadePageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  onComplete?: () => void;
  className?: string;
  panelClassName?: string;
  columns?: number;
  colors?: string[];
  duration?: number;
  staggerDelay?: number;
  ease?: EasingDefinition | number[];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
  mode?: "in-to-out" | "out-to-in";
  showLeadingStroke?: boolean;
  showTrailingStroke?: boolean;
  strokeWidth?: number;
  leadingStrokeColors?: string[];
  trailingStrokeColors?: string[];
}

/**
 * Secondary yellow/amber palette matching the portfolio's warm golden aesthetic
 * (Tailwind amber-400/500/600 & yellow-300/400/500 hues)
 */
export const yellowPalette = [
  "#f59e0b", // Amber 500
  "#fbbf24", // Amber 400
  "#facc15", // Yellow 400
  "#fde047", // Yellow 300
  "#fef08a", // Yellow 200
  "#fcd34d", // Amber 300
  "#eab308", // Yellow 500
  "#ca8a04", // Yellow 600
  "#d97706", // Amber 600
  "#b45309", // Amber 700
  "#d97706", // Amber 600
  "#eab308", // Yellow 500
  "#facc15", // Yellow 400
  "#fbbf24", // Amber 400
];

export const yellowStrokePalette = [
  "#fef08a", // Cream Yellow highlight
  "#fde047", // Luminous Yellow
  "#facc15", // Sunflower Yellow
  "#fbbf24", // Honey Amber
  "#f59e0b", // Warm Amber
];

export default function CascadePageTransition({
  trigger,
  onViewSwap,
  onComplete,
  className,
  panelClassName,
  columns = 14,
  colors = yellowPalette,
  duration = 0.55,
  staggerDelay = 0.035,
  ease = [0.76, 0, 0.24, 1],
  direction = "top",
  exitOpposite = true,
  mode = "in-to-out",
  showLeadingStroke = false,
  showTrailingStroke = false,
  strokeWidth = 10,
  leadingStrokeColors = yellowStrokePalette,
  trailingStrokeColors = yellowStrokePalette,
}: CascadePageTransitionProps) {
  const [transitionState, setTransitionState] = useState<
    "idle" | "entering" | "covered" | "exiting"
  >("idle");
  const onViewSwapRef = useRef(onViewSwap);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const maxMultiplier = Math.floor((columns - 1) / 2);
      const maxStagger = maxMultiplier * staggerDelay;
      const totalAnimationTime = (duration + maxStagger) * 1000;

      const coverTimeout = setTimeout(() => {
        if (onViewSwapRef.current) onViewSwapRef.current();
        setTransitionState("covered");
      }, totalAnimationTime);

      const exitTimeout = setTimeout(() => {
        setTransitionState("exiting");
      }, totalAnimationTime + 200);

      const idleTimeout = setTimeout(
        () => {
          setTransitionState("idle");
          if (onCompleteRef.current) onCompleteRef.current();
        },
        totalAnimationTime * 2 + 200,
      );

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(exitTimeout);
        clearTimeout(idleTimeout);
      };
    }
  }, [trigger, columns, duration, staggerDelay]);

  if (transitionState === "idle") return null;

  const isVertical = direction === "top" || direction === "bottom";
  const isOutToIn = mode === "out-to-in";

  const getTransform = (state: "enter" | "exit") => {
    if (isVertical) {
      const isEnterBottom = direction === "bottom";
      if (state === "enter") {
        return { y: isEnterBottom ? "100%" : "-100%", x: "0%" };
      } else {
        return exitOpposite
          ? { y: isEnterBottom ? "-100%" : "100%", x: "0%" }
          : { y: isEnterBottom ? "100%" : "-100%", x: "0%" };
      }
    } else {
      const isEnterRight = direction === "right";
      if (state === "enter") {
        return { x: isEnterRight ? "100%" : "-100%", y: "0%" };
      } else {
        return exitOpposite
          ? { x: isEnterRight ? "-100%" : "100%", y: "0%" }
          : { x: isEnterRight ? "100%" : "-100%", y: "0%" };
      }
    }
  };

  const panels = Array.from({ length: columns }, (_, i) => i);

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-full w-full overflow-hidden",
        isVertical ? "flex-row" : "flex-col",
        className,
      )}
    >
      {panels.map((i) => {
        const centerIndex = (columns - 1) / 2;
        const distanceFromCenter = Math.abs(i - centerIndex);
        const minDistance = columns % 2 === 0 ? 0.5 : 0;
        const delayMultiplier = distanceFromCenter - minDistance;
        const maxMultiplier = Math.floor((columns - 1) / 2);
        const finalDelayMultiplier = isOutToIn
          ? maxMultiplier - delayMultiplier
          : delayMultiplier;

        const delay = Math.max(0, finalDelayMultiplier * staggerDelay);
        const color = colors[i % colors.length];

        const leadingColor =
          leadingStrokeColors && leadingStrokeColors.length > 0
            ? leadingStrokeColors[i % leadingStrokeColors.length]
            : null;

        const trailingColor =
          trailingStrokeColors && trailingStrokeColors.length > 0
            ? trailingStrokeColors[i % trailingStrokeColors.length]
            : null;

        let leadingClasses = "absolute shadow-md";
        let trailingClasses = "absolute shadow-md";

        if (direction === "left") {
          leadingClasses += " right-0 top-0 bottom-0";
          trailingClasses += " left-0 top-0 bottom-0";
        } else if (direction === "right") {
          leadingClasses += " left-0 top-0 bottom-0";
          trailingClasses += " right-0 top-0 bottom-0";
        } else if (direction === "top") {
          leadingClasses += " bottom-0 left-0 right-0";
          trailingClasses += " top-0 left-0 right-0";
        } else if (direction === "bottom") {
          leadingClasses += " top-0 left-0 right-0";
          trailingClasses += " bottom-0 left-0 right-0";
        }

        const isCoveredOrEntering =
          transitionState === "entering" || transitionState === "covered";

        const initialPos = getTransform("enter");
        const targetPos = isCoveredOrEntering
          ? { x: "0%", y: "0%" }
          : getTransform("exit");

        return (
          <motion.div
            key={i}
            initial={initialPos}
            animate={targetPos}
            transition={{
              duration: duration,
              ease: ease,
              delay: delay,
            }}
            className={cn(
              "pointer-events-auto relative flex flex-1 items-center justify-center overflow-hidden",
              panelClassName,
            )}
            style={{
              backgroundColor: color,
              width: isVertical ? `calc(${100 / columns}% + 0.5px)` : "100%",
              height: isVertical ? "100%" : `calc(${100 / columns}% + 0.5px)`,
              marginLeft: isVertical && i > 0 ? "-0.2px" : "0px",
              marginTop: !isVertical && i > 0 ? "-0.2px" : "0px",
            }}
          >
            {showLeadingStroke && leadingColor && (
              <div
                className={leadingClasses}
                style={{
                  backgroundColor: leadingColor,
                  ...(isVertical
                    ? { height: strokeWidth }
                    : { width: strokeWidth }),
                }}
              />
            )}

            {showTrailingStroke && trailingColor && (
              <div
                className={trailingClasses}
                style={{
                  backgroundColor: trailingColor,
                  ...(isVertical
                    ? { height: strokeWidth }
                    : { width: strokeWidth }),
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function RouteTransitionProvider({
  children,
  navigate,
  className,
  panelClassName,
  columns,
  colors = yellowPalette,
  duration,
  staggerDelay,
  ease,
  direction,
  exitOpposite,
  mode,
  showLeadingStroke,
  showTrailingStroke,
  strokeWidth,
  leadingStrokeColors = yellowStrokePalette,
  trailingStrokeColors = yellowStrokePalette,
}: Omit<CascadePageTransitionProps, "trigger" | "onViewSwap"> & {
  children: React.ReactNode;
  navigate: (url: string) => void;
}) {
  const [trigger, setTrigger] = useState(0);
  const [pendingUrl, setPendingUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      if (target.href === window.location.href) {
        return;
      }

      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("//") &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !href.startsWith("javascript:") &&
        targetAttr !== "_blank" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();

        setPendingUrl(href);
        setTrigger((prev) => prev + 1);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  const handleViewSwap = () => {
    if (pendingUrl) {
      navigate(pendingUrl);
    }
  };

  return (
    <>
      {mounted && (
        <CascadePageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          columns={columns}
          colors={colors}
          duration={duration}
          staggerDelay={staggerDelay}
          ease={ease}
          direction={direction}
          exitOpposite={exitOpposite}
          mode={mode}
          showLeadingStroke={showLeadingStroke}
          showTrailingStroke={showTrailingStroke}
          strokeWidth={strokeWidth}
          leadingStrokeColors={leadingStrokeColors}
          trailingStrokeColors={trailingStrokeColors}
        />
      )}
      {children}
    </>
  );
}
