interface Props extends astroHTML.JSX.BaseHTMLAttributes {
  title: string;
  width?: number | string;
  height?: number | string;
}

export const DEFAULT_WIDTH = 235;
export const DEFAULT_HEIGHT = 130;

export const ToggleLight = ({
  title,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  class: className,
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 235 130`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(className ? { className } : {})}
    >
      {title}
      <rect width="235" height="130" rx="65" fill="#1E1E1E" />
      <rect
        x="122.5"
        y="32"
        width="12.5"
        height="12.5"
        rx="6.25"
        fill="white"
      />
      <rect
        x="110"
        y="52.3125"
        width="6.77083"
        height="6.77083"
        rx="3.38542"
        fill="white"
      />
    </svg>
  );
};
