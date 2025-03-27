import { TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { SystemProgram } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';
import WebSocket from 'ws';
import { solanaConnection } from './config';

export function sendRequest(ws: WebSocket) {
  const request = {
    jsonrpc: "2.0",
    id: 420,
    method: "transactionSubscribe",
    params: [
      {
        failed: false,
        accountInclude: ["6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"]
      },
      {
        commitment: "processed",
        encoding: "jsonParsed",
        transactionDetails: "full",
        maxSupportedTransactionVersion: 0
      }
    ]
  };
  ws.send(JSON.stringify(request));
}

export type JitoRegion = 'mainnet' | 'amsterdam' | 'frankfurt' | 'ny' | 'tokyo';
export const JitoEndpoints = {
  mainnet: 'https://mainnet.block-engine.jito.wtf/api/v1/transactions',
  amsterdam: 'https://amsterdam.mainnet.block-engine.jito.wtf/api/v1/transactions',
  frankfurt: 'https://frankfurt.mainnet.block-engine.jito.wtf/api/v1/transactions',
  ny: 'https://ny.mainnet.block-engine.jito.wtf/api/v1/transactions',
  tokyo: 'https://tokyo.mainnet.block-engine.jito.wtf/api/v1/transactions',
};

export function getJitoEndpoint(region: JitoRegion) {
  return JitoEndpoints[region];
}

export async function sendTxUsingJito({
  encodedTx,
  region = 'mainnet'
}: {
  encodedTx: string;
  region: JitoRegion;
}) {
  let rpcEndpoint = getJitoEndpoint(region);

  let payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sendTransaction",
    params: [encodedTx]
  };

  let res = await fetch(`${rpcEndpoint}?bundleOnly=false`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  let json = await res.json();
  if (json.error) {
    console.log(json.error);
    throw new Error(json.error.message);
  }
  return json;
}

export const distributeSol = async (kyepair: Keypair, pubkeyList: PublicKey[], amount: number) => {
  const tx = new Transaction()
  for (const item of pubkeyList) {
    const bal = await solanaConnection.getBalance(item)
    if (bal > amount) continue
    tx.add(
      SystemProgram.transfer({
        fromPubkey: kyepair.publicKey,
        toPubkey: item,
        lamports: amount - bal
      })
    )
  }

  const blockhash = (await solanaConnection.getLatestBlockhash('finalized')).blockhash
  console.log(blockhash)
  const messageV0 = new TransactionMessage({
    payerKey: kyepair.publicKey,
    recentBlockhash: blockhash,
    instructions: tx.instructions,
  }).compileToV0Message();
  const vtx = new VersionedTransaction(messageV0);
  vtx.sign([kyepair])
  // const sim = await connection.simulateTransaction(vtx, { sigVerify: true })
  // console.log(sim)
  const sig = await solanaConnection.sendTransaction(vtx)
  const confirm = await solanaConnection.confirmTransaction(sig)
  console.log(sig)
  // console.log(confirm)
}