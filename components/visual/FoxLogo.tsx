type FoxLogoProps = {
  className?: string;
  label?: string;
};

function FoxLogo({ className = "", label }: FoxLogoProps) {
  const decorative = !label;
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={label}
      className={className}
    >
      {label && <title>{label}</title>}
      <path d="M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z" />
      <circle cx="12.5" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export { FoxLogo };
