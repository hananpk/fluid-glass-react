import React, { CSSProperties, PropsWithChildren, useMemo } from "react";

export interface FluidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** SVG filter id */
  id?: string;

  /** Inner padding */
  padding?: string;

  /** Border radius */
  borderRadius?: string | number;

  /** Glass tint color */
  tintColor?: string;

  /** Distortion strength (negative = stronger glass) */
  displacementScale?: number;

  blurAmount?: number;
  saturation?: number;
  elasticity?: number;
}

const SvgFilterComponent = React.memo(
  ({
    id,
    baseFrequency,
    elasticity,
    displacementScale,
  }: {
    id: string;
    baseFrequency: string;
    elasticity: number;
    displacementScale: number;
  }) => (
    <svg style={{ display: "none" }}>
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={1}
            seed={0}
            result="noise"
          />
          <feGaussianBlur
            in="noise"
            stdDeviation={elasticity}
            result="blurred"
          />
          <feComposite
            operator="arithmetic"
            k1={0}
            k2={1}
            k3={2}
            k4={0}
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="litImage"
            scale={displacementScale}
            xChannelSelector="G"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
);

SvgFilterComponent.displayName = "SvgFilterComponent";

export const FluidGlass = React.memo(
  ({
    children,
    id = "lg-dist",
    className = "",
    style = {},
    padding = "10px 20px",
    borderRadius = "24px",
    tintColor = "rgba(0, 0, 0, 0.04)",
    displacementScale = -30,
    blurAmount = 0,
    saturation = 1.2,
    elasticity = 8,
    ...restProps
  }: PropsWithChildren<FluidGlassProps>) => {
    const shineFilter = useMemo(() => "hue-rotate(20deg)", []);
    const shineShadow = useMemo(
      () => "inset 1px 1px 1px #ffffff28, inset -1px -1px 0px #ffffff15",
      []
    );
    const baseFrequency = useMemo(() => "0.004 0.004", []);

    const outerStyle = useMemo<CSSProperties>(
      () => ({
        borderRadius,
        overflow: "hidden",
      }),
      [borderRadius]
    );

    const componentStyle = useMemo<CSSProperties>(
      () =>
        ({
          "--lg-border-radius": borderRadius,
          "--lg-tint-color": tintColor,
          "--lg-shine-filter": shineFilter,
          ...style,
          position: "relative",
          zIndex: 99,
          borderRadius,
          padding,
          width: "fit-content",
          overflow: "hidden",
        } as CSSProperties),
      [borderRadius, tintColor, shineFilter, style, padding]
    );

    const contentStyle = useMemo<CSSProperties>(
      () => ({
        position: "relative",
        zIndex: 4,
      }),
      []
    );

    const layerBaseStyle = useMemo<CSSProperties>(
      () => ({
        position: "absolute",
        inset: 0,
        borderRadius,
      }),
      [borderRadius]
    );

    const effectLayerStyle = useMemo<CSSProperties>(
      () => ({
        ...layerBaseStyle,
        zIndex: -1,
        backdropFilter: `blur(${blurAmount}px) saturate(${saturation}) url(#${id})`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}) url(#${id})`,
        isolation: "isolate",
        overflow: "hidden",
      }),
      [layerBaseStyle, blurAmount, saturation, id]
    );

    const tintLayerStyle = useMemo<CSSProperties>(
      () => ({
        ...layerBaseStyle,
        zIndex: 1,
        background: tintColor,
      }),
      [layerBaseStyle, tintColor]
    );

    const shineLayerStyle = useMemo<CSSProperties>(
      () => ({
        ...layerBaseStyle,
        zIndex: 2,
        overflow: "hidden",
        filter: shineFilter,
        boxShadow: shineShadow,
      }),
      [layerBaseStyle, shineFilter, shineShadow]
    );

    return (
      <>
        <SvgFilterComponent
          id={id}
          baseFrequency={baseFrequency}
          elasticity={elasticity}
          displacementScale={displacementScale}
        />

        <div style={outerStyle}>
          <div className={className} style={componentStyle} {...restProps}>
            {/* Liquid distortion */}
            <div style={effectLayerStyle} />

            {/* Tint */}
            <div style={tintLayerStyle} />

            {/* Shine */}
            <div style={shineLayerStyle} />

            {/* Content */}
            <div style={contentStyle}>{children}</div>
          </div>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.padding === nextProps.padding &&
      prevProps.borderRadius === nextProps.borderRadius &&
      prevProps.tintColor === nextProps.tintColor &&
      prevProps.displacementScale === nextProps.displacementScale &&
      prevProps.blurAmount === nextProps.blurAmount &&
      prevProps.saturation === nextProps.saturation &&
      prevProps.elasticity === nextProps.elasticity &&
      prevProps.className === nextProps.className &&
      prevProps.children === nextProps.children &&
      JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)
    );
  }
);

FluidGlass.displayName = "FluidGlass";
