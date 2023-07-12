// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    const data = req.body;

    try {
      const connectedClient = await MongoClient.connect(
        "mongodb+srv://firehawk89:mixgaming1@meetups.izwxdl6.mongodb.net/?retryWrites=true&w=majority"
      );
      const db = connectedClient.db();

      const meetupsCollection = db.collection("meetups");
      await meetupsCollection.insertOne(data);

      connectedClient.close();
      res.status(201).json({ message: "Meetup inserted" });
    } catch (err) {
      console.log("ERROR: " + err);
    }
  }
}

export default handler;
