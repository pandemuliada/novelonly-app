import Head from "next/head";
import Link from "next/link";

import TBATEChapters from "novels/the-beginning-after-the-end.json";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const [lastReadChapter, setLastReadChapter] = useLocalStorage(
    "last_read_chapter/tbate"
  );

  console.log(lastReadChapter);
  return (
    <div>
      <Head>
        <title>Novel App</title>
        <meta name="description" content="Novel App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          maxWidth: 500,
          margin: "auto",
          padding: "24px",
        }}
      >
        <h1>The Beginning After The End</h1>

        {!!lastReadChapter && (
          <Link href={`/the-beginning-after-the-end/${lastReadChapter}`}>
            <a
              style={{
                display: "block",
                background: "#dedede",
                padding: 20,
              }}
            >
              Last Read - {TBATEChapters[lastReadChapter].title}
            </a>
          </Link>
        )}

        <div>
          {TBATEChapters.map((chapter, index) => {
            return (
              <p>
                <Link href={`/the-beginning-after-the-end/${index}`}>
                  <a>{chapter.title}</a>
                </Link>
              </p>
            );
          })}
        </div>
      </main>
    </div>
  );
}
