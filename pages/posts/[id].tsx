import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown renderers={renderers} children={postData.content} />
        <Link
          href={`https://github.com/kenzoukenzou/nextJsBlog/edit/main/posts/${postData.id}.md`}
        >
          <a target="_blank">Edit on GitHub</a>
        </Link>
      </article>
    </Layout>
  );
}
