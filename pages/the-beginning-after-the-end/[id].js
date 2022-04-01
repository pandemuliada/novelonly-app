import Head from "next/head";
import TBATEChapters from "novels/the-beginning-after-the-end.json";
import ReactMarkdown from "react-markdown";

const ChapterDetailPage = (props) => {
  const { chapter, id } = props;

  return (
    <>
      <Head>
        <title>The Beginning After The End - {chapter.title}</title>
        <meta
          name="description"
          content={`The Beginning After The End - ${chapter.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          maxWidth: 500,
          margin: "auto",
          padding: "24px",
        }}
      >
        <h1>The Beginning After The End - {chapter.title}</h1>

        <div
          style={{
            lineHeight: "1.8rem",
          }}
        >
          <ReactMarkdown children={chapter.content} />
        </div>
      </div>
    </>
  );
};

export default ChapterDetailPage;

ChapterDetailPage.getInitialProps = async (ctx) => {
  return {
    chapter: TBATEChapters[ctx.query.id],
    id: ctx.query.id,
  };
};
