import styled, { css } from 'styled-components'; 

export const breakpoints = (
  cssProp = "padding", // the CSS property to apply to the breakpoints
  cssPropUnits = "px", // the units of the CSS property (can set equal to "" and apply units to values directly)
  values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType = "max-width" // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const [screenBreakpoint, cssPropBreakpoint] = [
      Object.keys(value)[0],
      Object.values(value)[0],
    ];
    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
    }
    `);
  }, "");
  return css([breakpointProps]);
};

export const PlaylistWrapper = styled.div`
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  ${breakpoints("margin-left", "%", [
    { 2000: 25 },
    { 600: 10 },
  ])};
  ${breakpoints("width", "%", [
    { 2000: 50 },
    { 600: 80 },
  ])};
  `;