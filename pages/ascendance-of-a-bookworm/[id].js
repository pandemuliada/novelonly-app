import Head from "next/head";
import AscendanceOfABookwormChapters from "novels/ascendance-of-a-bookworm.json";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Link from "next/link";

const ChapterDetailPage = (props) => {
  const { currentChapter, previousChapter, nextChapter, id } = props;

  const [lastReadChapter, setLastReadChapter] = useLocalStorage(
    "last_read_chapter/ascendance-of-a-bookworm"
  );

  useEffect(() => {
    setLastReadChapter(id);
  }, [id]);

  return (
    <>
      <Head>
        <title>Ascendance Of A Bookworm - {currentChapter.title}</title>
        <meta
          name="description"
          content={`Ascendance Of A Bookworm - ${currentChapter.title}`}
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
        <Link href="/ascendance-of-a-bookworm">
          <a>Back to Chapters</a>
        </Link>
        <h1>Ascendance Of A Bookworm - {currentChapter.title}</h1>

        <div
          style={{
            lineHeight: "1.8rem",
          }}
        >
          <ReactMarkdown children={currentChapter.content} />
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
              <a
                style={{
                  display: "block",
                  background: "#dedede",
                  padding: 16,
                }}
              >
                Prev : {previousChapter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
          {!!nextChapter && (
            <Link href={`/the-beginning-after-the-end/${nextChapter.index}`}>
              <a
                style={{
                  display: "block",
                  background: "#dedede",
                  padding: 16,
                }}
              >
                Next : {nextChapter.title}
              </a>
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
      ...AscendanceOfABookwormChapters[parseInt(ctx.query.id) - 1],
    };
  } else {
    previousChapter = null;
  }

  if (ctx.query.id == AscendanceOfABookwormChapters.length - 1) {
    nextChapter = null;
  } else {
    nextChapter = {
      index: parseInt(ctx.query.id) + 1,
      ...AscendanceOfABookwormChapters[parseInt(ctx.query.id) + 1],
    };
  }

  return {
    id: ctx.query.id,
    currentChapter: AscendanceOfABookwormChapters[ctx.query.id],
    previousChapter,
    nextChapter,
  };
};
