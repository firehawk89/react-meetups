import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv://firehawk89:mixgaming1@meetups.izwxdl6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray(); // fetch id's

  connectedClient.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const connectedClient = await MongoClient.connect(
    "mongodb+srv://firehawk89:mixgaming1@meetups.izwxdl6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  connectedClient.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
