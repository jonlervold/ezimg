import axios from "axios";

const fetchDatabase = async (setDatabase) => {
  const res = await axios.get("http://localhost:3333/database");
  setDatabase(res.data);
};

export default fetchDatabase;
