import styles from "../styles/Home.module.css";
import Head from "next/head";
import Navbar from "./Navbar";
import Sender from "./Sender";
import Inbox from "./Inbox";

function Home() {
  return (
    <div>
      <Head>
        <title>My Own Mails</title>
      </Head>
      <Navbar />
      <Sender />
      <Inbox />
    </div>
  );
}

export default Home;
