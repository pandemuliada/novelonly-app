import Head from "next/head";
import Link from "next/link";

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
        <h1 className="text-3xl font-bold mb-5">Novel Reader</h1>

        <p className="mb-2 text-lg">
          <Link href="/ascendance-of-a-bookworm">
            <a>Ascendance Of A Bookworm</a>
          </Link>
        </p>

        <p className="mb-2 text-lg">
          <Link href="/the-beginning-after-the-end">
            <a>The Beginning After The End</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
