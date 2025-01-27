import 'dotenv/config'
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'

export const mainKeypairHex = process.env.MAIN_KEYPAIR_HEX!
export const mainKeypair = Keypair.fromSecretKey(bs58.decode(mainKeypairHex))
export const solanaRpcUrl = process.env.MAIN_RPC_URL!
export const solanaWssUrl = process.env.MAIN_WSS_URL!
export const solanaConnection = new Connection(solanaRpcUrl, { wsEndpoint: solanaWssUrl })
export const devRpcUrl = process.env.DEV_RPC_URL!
export const devWssUrl = process.env.DEV_WSS_URL!
export const devConnection = new Connection(devRpcUrl, { wsEndpoint: devWssUrl })
export const treasury = new PublicKey(process.env.TREASURY_WALLET!)
export enum commitmentType {
    Finalized = "finalized",
    Confirmed = "confirmed",
    Processed = "processed"
}
export const jitoFee = 1_000_000
export const treasuryFee = 1_000_000

export const data = [
    { wallet: 'zk2xK3tVsmTq4qcJm76JwpAb45REoVXsQWJV8NCcR8Kv3Y9KNFtBiBECQAnZSQWLnTSC', amount: 0.00001 },
    { wallet: 'rzgbeLjtUwCaB1zWY9bsnxsY8fx7bUzDYfEBAtmTGAMWdVWPeJUJpTjK7aw8t5nTSSUAf', amount: 0.00001 },
    { wallet: 'nEbTKozzenvqkbdBZuUjFv9jNRH8jUdM3tsFuimm74yT7mQFVcvSjfn2KAUth5ptGGJV', amount: 0.00001 },
    { wallet: 'eBmJjyukQxrbsjrNsTXeV9SdSQSG2yEkwEWqN28N9Jm8vyeZhFWXPsnUkihHUeyHhpTfL', amount: 0.00001 },
    { wallet: 'QiSknKEhkYhkxQ8us4Ho54mqkDG2e9w5Zv3Dzv61wP4pzgbm8e3mjsi9Rgm2hJksrn8V4', amount: 0.00001 },
    { wallet: 'je6rqJKqoBkqTiNPSrsZ4Whw7nJbdsaGtcJnZxy1mUhNUixezCkY7phZGBLgNFJWyDFw', amount: 0.00001 },
    { wallet: 'HCxA6aKGhU7BsY3n9qf4sSAfgCzzZGnYR8UzeP3ribsc1cZBoQfngt3D5V4RxRfvQWocp', amount: 0.00001 },
    { wallet: 'fKmD6uzUgcYEBmZ9WcXW7YAPKYHa5djdFisGsi7ww1c6apW2xLeZ4T9rgoFVcRbZYQTQY', amount: 0.00001 },
    { wallet: '7MbdBr2GZMx3kosmBTs1az474ZDWHeiZQKX6k4KxgzpfriohDVyJoYq5VwYBGsBieY3zT', amount: 0.00001 },
    { wallet: 'XJyN2riTvgudquJFa1EVveAFYQSUCJYQDy7JvoBnBENncKgfVDQQB4VzTCcUTFv9i4cWA', amount: 0.00001 },
    { wallet: '42Xycr8oLZmY5AaCFh1Zp2825tBPAzms3UAXjLi4S4jZe8n8TfFm2JiqmT4FPwECEJk72', amount: 0.00001 },
    { wallet: 'EUnyVdQ4KNmG3hT5sWzk6YhfdAadk6CuBZ2cPdHY2ENC1ED2HhzJUqcyiWWiSSC35esSE', amount: 0.00001 },
    { wallet: 'xmsvutMkRrifNAWHheWrearmKQo3dZ4eKe8Z4KnsHv59rHKbfpT3bCWjZ7FNLUUpMc1HL', amount: 0.00001 },
    { wallet: 'eF4MXZ76CJWVroEQPbfn1sJAa6EWeXbdio8NSPiHL3mZpwfuwiA4hUEzLEGjyAc7wJJER', amount: 0.00001 },
    { wallet: 'U8ysnQ4aRmx3VQMGRJguoWsZstWhT5j67whxejVmkhswqwZGCK2ujEF2fMgUjhJTasDyG', amount: 0.00001 },
    { wallet: '3oXtzbL6jXz8zfkkMxZzDtykXKfqXCJbpUkmGBMcQoNeWGjXCAorzntYc88VDWWZ6zR1', amount: 0.00001 },
// 15
    { wallet: 'Vdr8b1YEy9QKTMTwEYYUknYF1wGfDbmx3bb4CzR8KuwZoRmQaXS2Rc3nMrvk6Mf6twp5d', amount: 0.00001 },
    { wallet: 'FJv6LHhQPWc8WPxXm9Z3gW4i77fwcxGwQXZj1YZaZTrmgTDe815wHVgvisRGMfJUemGbg', amount: 0.00001 },
    { wallet: 'fUVxmTiNzrrFEPzEu7m1NAd8SJ4A2n7WA7QYxoMixmKwgr78Y3zqZLUYEKHcm9C9SHCeg', amount: 0.00001 },
    { wallet: '2zmuwbZgRKiMN9YZUyahF7ix4ySfg5C8fVoNTaMf9gQCtEgjKbgLkkE8TFshtH895L35B', amount: 0.00001 },
    { wallet: 'tCFoVy5VGpmEMS4bHCkNCMNKTRrWQjAEZN9uxo6sKKQiu2zBdXYh7xqzMpbwk6DEVUKhW', amount: 0.00001 },
    { wallet: 'gjdKpumTxL33oTojqD7asycjg1fQwD9roA7UmcLpFyPP2U5rg2YdGudJ58iKGXioqycyW', amount: 0.00001 },
    { wallet: 'eAp4GLDMD7Am3eZW92tECRsk6mdmtY4TSjDk7dGLwud9DEHQiwZSD1syCCueP11sYrH4b', amount: 0.00001 },

    { wallet: 'EEyQoMYpPC5QRK375DzeggmdaRGwoP8gQzxvxrUzGZKMam1FoDb1NSd13PU5MTmuYffoS', amount: 0.00001 },
    { wallet: 'ZT7vQudnW7gwybfL5bxMzWZg3QGjSy3nbQnL78rrMJ3bBHsEzK7RihxxgkpnyNHYXNa91', amount: 0.00001 },
    { wallet: '5nYAE9qWkproGkQSkAojSsMiWY16wD7JYWuUU5jSNDT8a5T1EkPyaJP9BHnYcwb1CGVR5', amount: 0.00001 },
    { wallet: 'wVjTaoHMVRfK1sbk2P2JEr5M5FNjq4edcGE2Z4ENmBA7NeSV49brB4bNcWgK2GkLzisZD', amount: 0.00001 },
    { wallet: 'Vd5P3RdHtq9FgPTZBQFvHDHbfVYKo8FrUAUwB9ibrfzjEZBgyYmi2iD196KYRH91bkokk', amount: 0.00001 },
    { wallet: 'Kh9a7VWeJzQSQEDKucJSfjGcNJeiauGmZQRbcaBCGKnq7H7KouMZtVNJHJYimVw87T28a', amount: 0.00001 },

    { wallet: 'ztmQzBACbyZeUbUB8s3tV2j4imBXDrQr4An2ivXHRwHWXfWJxT1sZ81HJyLJwzjT9gyyg', amount: 0.00001 },
    { wallet: 'EfYqxUo32XFG9fu6ABvNiD7o1h3CrRFnNUkPDbZEA4qTNySGhPMUMb1KVNsvyKkGvaDhn', amount: 0.00001 },
]

export const systemProgram = new PublicKey('11111111111111111111111111111111')
export const eventAuthority = new PublicKey('Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1')
export const pumpFunProgram = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P')
export const rentProgram = new PublicKey('SysvarRent111111111111111111111111111111111')