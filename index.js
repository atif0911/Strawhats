const {MongoClient} = require("mongodb");

const uri = "mongodb:";

const client = new MongoClient(uri);

const main = async () => {
    await client.connect();
    const db = client.db(dbName: 'crop_diseases');
    const collection = db.collection(name: 'disease name');
    console.log(data);
    return "done";
}

main()
 .then(console.log())
 .catch((e:any):void => console.log(e))
 .finally(() => client.close());