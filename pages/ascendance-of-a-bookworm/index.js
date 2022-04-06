import Head from "next/head";
import Link from "next/link";

import AscendanceOfABookwormChapters from "novels/ascendance-of-a-bookworm.json";
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
          maxWidth: 600,
          margin: "auto",
          padding: "24px",
        }}
      >
        <Link href="/">
          <a>Back to Home</a>
        </Link>

        <h1 className="text-3xl my-5">Ascendance Of A Bookworm</h1>

        {!!lastReadChapter && (
          <Link href={`/ascendance-of-a-bookworm/${lastReadChapter}`}>
            <a className="card text-lg mb-5">
              Last Read - {AscendanceOfABookwormChapters[lastReadChapter].title}
            </a>
          </Link>
        )}

        <div>
          {AscendanceOfABookwormChapters.map((chapter, index) => {
            return (
              <p className="mb-2 text-lg">
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
