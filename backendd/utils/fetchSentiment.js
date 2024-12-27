const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const fetchSentiment = async (text) => {
  try{
  const response = await axios.post(process.env.BACK_PY, { text });
  return response.data.sentiment;
  }
  catch(error){
    console.error("Error fetching sentiment:", error);
    return "Error fetching sentiment";
  }
};

module.exports = fetchSentiment;
