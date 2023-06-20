import styled from "styled-components";

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const TextArea = styled.textarea<{
  error?: boolean;
  width?: string;
}>`
  width: ${({ width }) => width || "100%"};
  height: 100px;
  font-family: ${({ theme }) => theme.fonts.primary};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.gray97)};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: 20px;
  resize: vertical;
  outline: none;
  padding: 20px 20px;
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray97};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    font-style: bold;
    font-family: ${({ theme }) => theme.fonts.primary};
  }
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    border: 1px solid ${({ theme }) => theme.colors.gray97};
    color: ${({ theme }) => theme.colors.gray97};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Toggle = styled.div<{
  checked: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 3rem;
  height: 1.5rem;
  border-radius: 25px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.gray};
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  box-shadow: inset 0 0 10px #00000020;

  &::before {
    content: "";
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    position: absolute;
    left: -4px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 5px #00000040;
  }

  ${({ checked, theme }) =>
    checked &&
    `
          &::before {
              left: 1.8rem;
          }
      `}
`;

export const ErrorMensage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  letter-spacing: 0.9px;
  margin-top: 5px;
  margin-left: 10px;
`;
