import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IconContext } from "react-icons";
import { THEME } from "../../theme";
export default function LoadingIcone({ color }: { color?: string }) {
  return (
    <AiOutlineLoading3Quarters
      className="loading-icone"
      color={color || THEME.colors.primary}
    />
  );
}
