import { Flex } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import { LastPosts } from "../../src/components/organisms/LastPosts";
import { getAllPostsForHome } from "../../src/utils/blog";

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges;

  return (
    <Flex>
      <Head>
        <title>{`Profit-Place: Lugar de fazer dinheiro`}</title>
      </Head>
      <Flex direction={"column"} gap={"2"}>
        <LastPosts posts={morePosts} heroPost={heroPost} />
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
