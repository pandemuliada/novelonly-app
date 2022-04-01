import Head from "next/head";
import Link from "next/link";

import TBATEChapters from "novels/the-beginning-after-the-end.json";
import useLocalStorage from "use-local-storage";

export default function Index() {
  const [lastReadChapter, setLastReadChapter] = useLocalStorage(
    "last_read_chapter/ascendance-of-a-bookworm"
  );

  return (
    <div>
      <Head>
        <title>Ascendance Of A Bookworm</title>
        <meta name="description" content="Ascendance Of A Bookworm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          maxWidth: 500,
          margin: "auto",
          padding: "24px",
        }}
      >
        <Link href="/">
          <a>Back to Home</a>
        </Link>

        <h1>Ascendance Of A Bookworm</h1>

        {!!lastReadChapter && (
          <Link href={`/ascendance-of-a-bookworm/${lastReadChapter}`}>
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
                <Link href={`/ascendance-of-a-bookworm/${index}`}>
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
