import Head from "next/head";
import Link from "next/link";

import TBATEChapters from "novels/the-beginning-after-the-end.json";
import useLocalStorage from "use-local-storage";

export default function Index() {
  const [lastReadChapter, setLastReadChapter] = useLocalStorage(
    "last_read_chapter/tbate"
  );

  return (
    <div>
      <Head>
        <title>Novel App</title>
        <meta name="description" content="Novel App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          maxWidth: 600,
          margin: "auto",
          padding: "24px",
        }}
      >
        <Link href="/">
          <a>Back to Home</a>
        </Link>

        <h1 className="text-3xl font-bold my-5">The Beginning After The End</h1>

        {!!lastReadChapter && (
          <Link href={`/the-beginning-after-the-end/${lastReadChapter}`}>
            <a className="card text-lg mb-5">
              Last Read - {TBATEChapters[lastReadChapter].title}
            </a>
          </Link>
        )}

        <div>
          {TBATEChapters.map((chapter, index) => {
            return (
              <p className="mb-2 text-lg">
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
