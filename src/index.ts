import bs58 from 'bs58'
import fs from 'fs'
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { geyserRpc, JITO_TIP_ACC, mainKeypair, solanaConnection } from "./config";
import { PumpFunSDK } from "./pump";
// import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { openAsBlob, existsSync } from "fs";
import WebSocket from 'ws';
import path from "path";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { sendRequest } from './utils';
import { PumpFun, PumpFunIDL } from './pump/utils/IDL';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

const createAndBatchBuy = async () => {
    const wallet = new NodeWallet(mainKeypair)
    const provider = new AnchorProvider(solanaConnection, wallet, {
        commitment: "finalized",
    });

    const imageName = 'tensorian.png'

    const uploadFolder = path.join(process.cwd(), '/src/image')
    const imagePath = path.join(uploadFolder, imageName)

    if (!existsSync(imagePath)) {
        console.error('image not exist')
        return
    }

    const image = await openAsBlob(imagePath)

    const tokenMetadata = {
        name: 'en1omy',
        symbol: 'EMY',
        description: 'This is pump.fun token created by enlomy using customized pump fun sdk',
        file: image,
        twitter: 'https://x.com/en1omy',
        telegram: 'https://t.me/enlomy',
        website: 'https://enlomy.com',
    }

    const sdk = new PumpFunSDK(provider)
    const count = 20
    const amount = 0.000001

    const dataList: Array<string> = []
    for (let i = 0; i < count; i++) {
        const mint = Keypair.generate()
        dataList.push(bs58.encode(mint.secretKey))
    }
    console.log('--------------')
    fs.writeFileSync('data.json', JSON.stringify({}))
    // fs.writeFileSync('data.json', JSON.stringify(dataList, null, 2))

    // const mintResult = await sdk.createAndBatchBuy(keypairList, amountList, tokenMetadata, mint)
    // console.log(mintResult)
}

const BUY_AMOUNT = 0.0001 * LAMPORTS_PER_SOL
const MAX_SOL_COST = LAMPORTS_PER_SOL

const withGaser = () => {
    const creator = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(process.env.HEX_KEY_1!)))
    const buyer = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(process.env.HEX_KEY_2!)))
    const PUMPFUN_FEE_RECEIPT = new PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM");
    const wallet = new NodeWallet(buyer)
    const provider = new AnchorProvider(solanaConnection, wallet, { commitment: "processed" });
    const program = new Program<PumpFun>(PumpFunIDL as PumpFun, provider);

    const jitoTipAcc = new PublicKey(Math.floor(Math.random() * JITO_TIP_ACC.length))

    if (!geyserRpc) return console.log('Geyser RPC is not provided!');

    const ws = new WebSocket(geyserRpc);

    ws.on('open', function open() {
        console.log('WebSocket is open');
        sendRequest(ws);  // Send a request once the WebSocket is open
    });

    ws.on('close', function open() {
        console.log('WebSocket is closed');
    });

    ws.on('message', async function incoming(data: any) {

        const messageStr = data.toString('utf8');
        try {
            const messageObj = JSON.parse(messageStr);
            const result = messageObj.params.result;
            const logs = String(result.transaction.meta.logMessages);
            const signature = result.signature; // Extract the signature
            const accountKeys = result.transaction.transaction.message.accountKeys.map((ak: { pubkey: any; }) => ak.pubkey);
            fs.appendFileSync('logs.txt', `${new Date().toUTCString()} ${signature}\n`)
            fs.appendFileSync('logs.txt', `${logs}\n`)

            if (logs.includes('I')) {
                const mint = new PublicKey(accountKeys[1])
                const bondingCurve = new PublicKey(accountKeys[2])
                const slot = await solanaConnection.getSlot('processed')
                const txSlot = messageObj.params.result.slot
                console.log('created', slot, txSlot)
                console.log('signature', signature)

                // if (slot + 2 < parseInt(messageObj.params.result.slot)) {
                //     console.time("1")
                //     console.log("=========================================");
                //     console.log("current : ", slot);
                //     console.log("tx : ", messageObj.params.result.slot);
                //     console.log("Detect Sig : ", signature);
                //     ws.close()

                //     const userAta = getAssociatedTokenAddressSync(mint, buyer.publicKey)
                //     const associatedBondingCurve = getAssociatedTokenAddressSync(mint, bondingCurve, true);

                //     const tx = new Transaction()
                //     tx.add(createAssociatedTokenAccountInstruction(buyer.publicKey, userAta, buyer.publicKey, mint));
                //     const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ units: 100000, });

                //     const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 30000000, })

                //     const serviceFee = SystemProgram.transfer({
                //         fromPubkey: buyer.publicKey,
                //         toPubkey: jitoTipAcc,
                //         lamports: 0.001 * LAMPORTS_PER_SOL
                //     })

                //     tx
                //         // .add(modifyComputeUnits)
                //         // .add(addPriorityFee)
                //         .add(
                //             await program.methods
                //                 .buy(new BN(BUY_AMOUNT.toString()), new BN(MAX_SOL_COST.toString()))
                //                 .accounts({
                //                     feeRecipient: PUMPFUN_FEE_RECEIPT,
                //                     mint: mint,
                //                     associatedBondingCurve: associatedBondingCurve,
                //                     associatedUser: userAta,
                //                     user: buyer.publicKey,
                //                 })
                //                 .transaction()
                //         )
                //         .add(serviceFee)

                //     tx.feePayer = buyer.publicKey;

                //     const latestBlockhash = await solanaConnection.getLatestBlockhash({ commitment: "processed" })
                //     tx.recentBlockhash = latestBlockhash.blockhash;

                //     tx.sign(buyer);

                //     console.timeEnd("1")
                //     console.time("7")

                //     const serializedTx = tx.serialize()
                //     const transactionContent = bs58.encode(serializedTx);

                //     if (i++ != 0) return;

                //     const sig = await sendTxUsingJito({ encodedTx: transactionContent, region: "frankfurt" })
                //     solanaConnection.getSlot().then(ele => console.log("Bot Ended Slot : ", ele))
                //     console.log(sig);
                //     console.timeEnd("7");

                // }
            } else {
                console.log('swap')
            }
        } catch (e) {
            console.log(e)
        }
    })
}
