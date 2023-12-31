
import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
 
import { Paragraph, Title } from "../../atoms/typograph";
import { Accordion as AccordionContainer } from "@/components/ui/accordion";

export const AccordionOld: React.FC<{
  title: string;
  content?: string;
  children?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  value?: string;
  valueStyle?: React.CSSProperties;
}> = ({ title, content, children, value, valueStyle, titleStyle }) => {
  const [active, setActive] = useState(false);

  return (
    <AccordionContainer collapsible  className="w-full">
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
