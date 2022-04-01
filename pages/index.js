import Head from "next/head";
import Link from "next/link";

import TBATEChapters from "novels/the-beginning-after-the-end.json";

export default function Home() {
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

        {TBATEChapters.map((chapter, index) => {
          return (
            <p>
              <Link href={`/the-beginning-after-the-end/${index}`}>
                <a>{chapter.title}</a>
              </Link>
            </p>
          );
        })}
      </main>
    </div>
  );
}
