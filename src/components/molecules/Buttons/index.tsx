import { Button } from "./styles";

export const DefaultButton = ({
  text,
  onClick,
  type,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type: "confirmation" | "negation" | "disabled" | "neutral";
}) => {
  return (
    <Button type={type} onClick={onClick}>
      {text}
      {icon && icon}
    </Button>
  );
};
