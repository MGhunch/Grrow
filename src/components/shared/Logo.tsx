interface LogoProps {
  size?: number;
  dark?: boolean;
}

export default function Logo({ size = 28, dark = false }: LogoProps) {
  return (
    <img
      src={dark ? "/Grrow_gradient.svg" : "/Grrow_logo.svg"}
      alt="Grrow"
      style={{ height: size * 1.2, width: "auto" }}
    />
  );
}
