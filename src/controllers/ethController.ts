import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import Web3 from "web3";

configDotenv();

const INFURIA_HTTP_PROVIDER = new Web3.providers.HttpProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURIA_API_KEY}`
);
const WEB3 = new Web3(INFURIA_HTTP_PROVIDER);

export const getAccountBalance = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.body;
    if (!accountId) {
      return res.status(400).json({
        message: "Please provide a valid account ID",
      });
    }

    const balance = await WEB3.eth.getBalance(accountId).then((balance) => {
      return WEB3.utils.fromWei(balance, "ether");
    });

    return res.status(200).json({
      message: `Your account has ${balance.toString()} ETH.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An unexpected error occured."
    });
  }
};
