import { Flex, Link } from "@radix-ui/themes";
import { useUserData } from "../../../hooks/useUserData";
import { Avatar } from "../../Avatar";

export const TopNav = () => {
  const { userData } = useUserData();

  return (
    <Flex justify={"between"} align={"center"} px={"3"} my={"4"}>
      <Flex gap={"4"}>
        <a href={"/blog"}>
          <Link weight={"bold"}>inicio</Link>
        </a>
        <a href={"/precos"}>
          <Link weight={"bold"}>Preços</Link>
        </a>
        <a href={"/blog"}>
          <Link weight={"bold"}>Quem somos</Link>
        </a>
        <a href={"/contato"}>
          <Link weight={"bold"}>Contato</Link>
        </a>
      </Flex>

      {userData?._id && (
        <Flex>
          <Avatar size="small" src={userData.image} />
        </Flex>
      )}
    </Flex>
  );
};
