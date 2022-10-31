import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { address, chain } = req.body;
    if (!address || !chain) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    try {
      const options = {
        method: "GET",
        url: `${process.env.WEB3API_URL}/erc20/${address}/price`,
        params: { chain },
        headers: { accept: "application/json", "X-API-Key": process.env.WEB3API_KEY },
      };
      const { data } = await axios.request(options);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  }
};
