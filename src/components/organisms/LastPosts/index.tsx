import { Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";

export const LastPosts = ({ posts, heroPost }) => {
  console.log(posts);
  return (
    <Grid columns={"2"} gap={"2"}>
      <Link href={`/blog/${heroPost.slug}`}>
        <Card
          style={{
            backgroundImage: `url("${heroPost.featuredImage?.node.sourceUrl}")`,
            cursor: "pointer",
          }}
        >
          <Flex width={"100%"} justify={"end"} align={"end"} height={"9"}>
            <Heading as="h1">{heroPost.title}</Heading>
          </Flex>
        </Card>
      </Link>

      <Flex direction={"column"} gap={"2"}>
        <Link href={`/blog/${posts[1]?.node.slug}`}>
          <Card
            style={{
              backgroundImage: `url("${posts[1]?.node.featuredImage?.node.sourceUrl}")`,
              cursor: "pointer",
            }}
          >
            <Heading as="h1">{posts[1]?.node.title}</Heading>
          </Card>
        </Link>
        {
          <Link href={`/blog/${posts[2]?.node.slug}`}>
            <Card
              style={{
                backgroundImage: `url("${posts[2]?.node.featuredImage?.node.sourceUrl}")`,
                cursor: "pointer",
                backgroundSize: "cover",
              }}
            >
              <Flex width={"100%"}>
                <Heading as="h1">{posts[2]?.node.title}</Heading>
              </Flex>
            </Card>
          </Link>
        }
      </Flex>
    </Grid>
  );
};
