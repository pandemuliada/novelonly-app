import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

export default function Index(props) {
  const { slug, chapters = [] } = props;
  const [lastRead, setLastRead] = useLocalStorage(`last_read_chapter/${slug}`);

  return (
    <div>
      <Head>
        <title>The Beginning After The End</title>
        <meta name="description" content="The Beginning After The End" />
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

        {!!lastRead && (
          <Link href={`/${slug}/${lastRead}`}>
            <a className="card text-lg mb-5">
              Last Read - {chapters?.[lastRead]?.title}
            </a>
          </Link>
        )}

        <div>
          {chapters.map((chapter, index) => {
            return (
              <p key={chapter.title} className="mb-2 text-lg">
                <Link href={`/${slug}/${index}`}>
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

export async function getStaticProps(context) {
  const chapters = await axios
    .get(
      "https://novelonly-api.herokuapp.com/api/v1/the-beginning-after-the-end"
    )
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      slug: "the-beginning-after-the-end",
      chapters,
    }, // will be passed to the page component as props
    revalidate: 1800,
  };
}
