import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Input } from "@/components/ui/input";

export const SearchInput: React.FC<{
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  action?: (param: string) => void;
}> = ({ placeholder, onChange, action = (param) => {} }) => {
  const [value, setValue] = useState("");

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          action(value);
        }
      }}
      className="flex items-center justify-between  rounded-xl w-full"
    >
      <Input
        type="text"
        placeholder={placeholder || "Pesquisar..."}
        onChange={(event) => {
          setValue(event.target.value);
          onChange && onChange(event);
        }}
        value={value}
      />
      <BiSearch
        size={25}
     className="cursor-pointer ml-4"
        onClick={() => {
          action(value);
        }}
      />
    </div>
  );
};
