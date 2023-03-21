import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Header from "../components/header.js";
import Search from "../components/search.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>Etherscan Search</title>
        <meta name="description" content="My simple etherscan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.main}>
        <Header />
        <Search />
      </section>
    </>
  );
}
