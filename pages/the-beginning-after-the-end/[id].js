import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import axios from "axios";
import { isEmpty } from "lodash";

const ChapterDetailPage = (props) => {
  const { currentChapter, previousChapter, nextChapter, slug, id } = props;

  const [_lastRead, setLastRead] = useLocalStorage(`last_read_chapter/${slug}`);

  useEffect(() => {
    setLastRead(id);
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

export async function getStaticPaths() {
  const chapters = await axios
    .get(
      "https://novelonly-api.herokuapp.com/api/v1/the-beginning-after-the-end"
    )
    .then((res) => {
      return res.data;
    });

  return {
    paths: chapters.map((chapter) => ({
      params: {
        id: chapter.index.toString(),
      },
    })),
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const id = Number(context.params.id);

  const chapter = await axios
    .get(
      `https://novelonly-api.herokuapp.com/api/v1/the-beginning-after-the-end/${id}`
    )
    .then((res) => {
      return res.data;
    });

  const previousChapter = await axios
    .get(
      `https://novelonly-api.herokuapp.com/api/v1/the-beginning-after-the-end/${
        id - 1
      }`
    )
    .then((res) => {
      return res.data;
    });

  const nextChapter = await axios
    .get(
      `https://novelonly-api.herokuapp.com/api/v1/the-beginning-after-the-end/${
        id + 1
      }`
    )
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      id,
      slug: "the-beginning-after-the-end",
      currentChapter: chapter,
      previousChapter: isEmpty(previousChapter) ? null : previousChapter,
      nextChapter: isEmpty(nextChapter) ? null : nextChapter,
    }, // will be passed to the page component as props
    revalidate: 1800,
  };
}
