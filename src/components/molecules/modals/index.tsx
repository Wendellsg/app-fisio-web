import { useEffect } from "react";
import { Box } from "../../atoms/layouts";
import { Paragraph } from "../../atoms/typograph";
import * as S from "./styles";

export const Modals = ({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!isOpen) return null;

  return (
    <S.Modal>
      <S.ModalContent>
        <S.ModalHeader>
          {title && (
            <Paragraph size="sm" fontWeight="bold">
              {title}
            </Paragraph>
          )}

          <S.ModalClose onClick={onClose} />
        </S.ModalHeader>
        <Box
          maxHeight="80vh"
          margin="1rem 0"
          style={{
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </S.ModalContent>
    </S.Modal>
  );
};
