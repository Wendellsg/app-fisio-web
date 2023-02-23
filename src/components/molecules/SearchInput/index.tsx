import * as S from "./styles";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";

export const SearchInput: React.FC<{
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  action: (param: string) => void;
}> = ({ placeholder, onChange, action }) => {
  const inputRef = useRef(null);

  return (
    <S.SearchInputContainer
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          action(inputRef.current.value);
        }
      }}
    >
      <S.SearchInput
        type="text"
        placeholder={placeholder || "Pesquisar..."}
        onChange={onChange}
        ref={inputRef}
      />
      <BiSearch
        size={25}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          action(inputRef.current.value);
        }}
      />
    </S.SearchInputContainer>
  );
};
