import { Container, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { TopNav } from "../Nav/topNav";

export const BlogLayout = ({ children }) => {
  return (
    <Theme>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          overflow: auto;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <Flex
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          overflowY: "auto",
        }}
        justify={"center"}
      >
        <Container
          size={{
            initial: "1",
            md: "2",
            lg: "4",
          }}
        >
          <TopNav />
          {children}
        </Container>
      </Flex>
    </Theme>
  );
};
