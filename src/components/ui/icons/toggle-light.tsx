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
      <title>{title}</title>
      <rect width="235" height="130" rx="65" fill="#7FABFF" />
      <rect x="20" y="20" width="90" height="90" rx="45" fill="white" />
      <rect x="159" y="20" width="24" height="24" rx="12" fill="white" />
      <rect x="135" y="59" width="13" height="13" rx="6.5" fill="white" />
    </svg>
  );
};
