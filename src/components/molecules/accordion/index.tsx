
import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { AccordionContainer, ValueContainer } from "./styles";
import { Box } from "../../atoms/layouts";
import { Paragraph, Title } from "../../atoms/typograph";

export const Accordion: React.FC<{
  title: string;
  content?: string;
  children?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  value?: string;
  valueStyle?: React.CSSProperties;
}> = ({ title, content, children, value, valueStyle, titleStyle }) => {
  const [active, setActive] = useState(false);

  return (
    <AccordionContainer>
      <Box
        style={{
          cursor: "pointer",
        }}
        width="100%"
      >
        {value ? (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            onClick={() => setActive(!active)}
          >
            <Title color={active ? "primary" : "black"} style={titleStyle} size="md">
              {title}
            </Title>
            <ValueContainer>
              <Title color={active ? "primary" : "black"} style={valueStyle}  size="md">
                {value}
              </Title>
              {active ? (
                <BsChevronDown size={20} />
              ) : (
                <BsChevronRight size={20} />
              )}
            </ValueContainer>
          </Box>
        ) : (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            onClick={() => setActive(!active)}
          >
            <Title color={active ? "primary" : "black"}  size="md">{title}</Title>
            {active ? (
              <BsChevronDown size={20} />
            ) : (
              <BsChevronRight size={20} />
            )}
          </Box>
        )}
      </Box>
      {active ? (
        <Box flexDirection="column" gap="1rem" width="100%">
          <Paragraph color="white">{content}</Paragraph>
          {children ? children : null}
        </Box>
      ) : null}
    </AccordionContainer>
  );
};
