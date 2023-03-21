import Moralis from "moralis";

export const getEthPrice = async (req, res) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      chain: "0x1",
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
};

export const getBlockInfo = async (req, res) => {
  try {
    const latestBlock = await Moralis.EvmApi.block.getDateToBlock({
      date: Date.now(),
      chain: "0x1",
    });

    let blockNrOrParentHash = latestBlock.toJSON().block;
    let previousBlockInfo = [];

    for (let i = 0; i < 5; i++) {
      const previousBlockNrs = await Moralis.EvmApi.block.getBlock({
        chain: "0x1",
        blockNumberOrHash: blockNrOrParentHash,
      });
      blockNumberOrHash = previousBlockNrs.toJSON().parent_hash;
      if (i == 0) {
        previousBlockInfo.push({
          transactions: previousBlockNrs.toJSON().transactions.map((i) => {
            return {
              transactionHash: i.hash,
              time: i.block_timestamp,
              fromAddress: i.from_address,
              toAddress: i.to_address,
              value: i.value,
            };
          }),
        });
      }
      previousBlockInfo.push({
        blockNumber: previousBlockNrs.toJSON().number,
        totalTransactions: previousBlockNrs.toJSON().transaction_count,
        gasUsed: previousBlockNrs.toJSON().gas_used,
        miner: previousBlockNrs.toJSON().miner,
        time: previousBlockNrs.toJSON().timestamp,
      });
    }
    const response = {
      latestBlock: latestBlock.toJSON().block,
      previousBlockInfo,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAddress = async (req, res) => {
  try {
    const { query } = req;
    const chain = "0x1";

    const response =
      await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        address: query.address,
        chain,
      });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json();
  }
};
