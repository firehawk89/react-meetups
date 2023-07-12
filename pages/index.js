import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.req;

  // fetch from API

  return { props: { meetups: DUMMY_MEETUPS } };
} */

export async function getStaticProps() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv://firehawk89:mixgaming1@meetups.izwxdl6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  connectedClient.close();

  const transformedMeetups = meetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));

  return {
    props: { meetups: transformedMeetups },
    revalidate: 10, // regenerate page on the server each 10s
  };
}

export default HomePage;
