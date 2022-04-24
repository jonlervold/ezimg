import axios from "axios";
import { database } from "../types/databaseInterface";

const fetchDatabase = async (setDatabase: React.Dispatch<React.SetStateAction<database>>) => {
  const res = await axios.get("http://localhost:3333/database");
  setDatabase(res.data);
};

export default fetchDatabase;
