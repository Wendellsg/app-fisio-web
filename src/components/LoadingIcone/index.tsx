import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { THEME } from "../../theme";
export default function LoadingIcone({
  color,
  size = 35,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <AiOutlineLoading3Quarters
      className="loading-icone"
      color={color || THEME.colors.primary}
      size={size}
    />
  );
}
