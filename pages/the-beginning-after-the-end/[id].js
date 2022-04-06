import Head from "next/head";
import TBATEChapters from "novels/the-beginning-after-the-end.json";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Link from "next/link";
import rehypeRaw from "rehype-raw";

const ChapterDetailPage = (props) => {
  const { currentChapter, previousChapter, nextChapter, id } = props;

  const [lastReadChapter, setLastReadChapter] = useLocalStorage(
    "last_read_chapter/tbate"
  );

  useEffect(() => {
    setLastReadChapter(id);
  }, [id]);

  return (
    <>
      <Head>
        <title>The Beginning After The End - {currentChapter?.title}</title>
        <meta
          name="description"
          content={`The Beginning After The End - ${currentChapter?.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          maxWidth: 600,
          margin: "auto",
          padding: "24px",
        }}
      >
        <Link href="/the-beginning-after-the-end">
          <a>Back to Chapters</a>
        </Link>

        <h1 className="text-3xl font-bold my-5">
          The Beginning After The End - {currentChapter?.title}
        </h1>

        <div className="text-lg leading-8">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            children={currentChapter?.content}
            components={{
              p: (props) => <p {...props} className="mb-4 " />,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {!!previousChapter ? (
            <Link
              href={`/the-beginning-after-the-end/${previousChapter.index}`}
            >
              <a className="card">Prev : {previousChapter.title}</a>
            </Link>
          ) : (
            <div />
          )}
          {!!nextChapter && (
            <Link href={`/the-beginning-after-the-end/${nextChapter.index}`}>
              <a className="card">Next : {nextChapter.title}</a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ChapterDetailPage;

ChapterDetailPage.getInitialProps = async (ctx) => {
  let previousChapter = null;
  let nextChapter = null;

  if (ctx.query.id > 0) {
    previousChapter = {
      index: parseInt(ctx.query.id) - 1,
      ...TBATEChapters[parseInt(ctx.query.id) - 1],
    };
  } else {
    previousChapter = null;
  }

  if (ctx.query.id == TBATEChapters.length - 1) {
    nextChapter = null;
  } else {
    nextChapter = {
      index: parseInt(ctx.query.id) + 1,
      ...TBATEChapters[parseInt(ctx.query.id) + 1],
    };
  }

  return {
    id: ctx.query.id,
    currentChapter: TBATEChapters[ctx.query.id],
    previousChapter,
    nextChapter,
  };
};
