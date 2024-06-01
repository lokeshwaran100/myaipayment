import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  createAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

// Set the below to approriate values
const TREASURY_ADDRESS = "8Q9M9PNQP33EfHcyqueBub23z4bsAQjZn4UJ8vbeXCaj"
const DEV_01_WALLET_ADDRESS = "4LiaNzv7uK7mQqquBN9z7qkQ3LgH8vYg8nCapUAWuZ5A"
const DEV_02_WALLET_ADDRESS = "9chrXAxNB99xa5R9AkoTT6Ft17G98c9Vt8BFtBH3heJU"
const TOKEN_MINT_ADDRESS = "ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob";
const DEV_01_FEE = 20
const DEV_02_FEE = 10



const connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
const program = pg.program;

const admin = pg.wallet;

const paymentAccount = anchor.web3.Keypair.generate();

const tokenAddress = new anchor.web3.PublicKey(TOKEN_MINT_ADDRESS);
const treasuryWallet = new anchor.web3.PublicKey(TREASURY_ADDRESS);
const devWallet01 = new anchor.web3.PublicKey(DEV_01_WALLET_ADDRESS);
const devWallet02 = new anchor.web3.PublicKey(DEV_02_WALLET_ADDRESS);

console.log("Payment Account Address : " + paymentAccount.publicKey.toString());
console.log("Token Mint Address      : " + tokenAddress);
console.log("Treasury Wallet Address : " + treasuryWallet.toString());
console.log("Dev 01 Wallet Address   : " + devWallet01.toString());
console.log("Dev 02 Wallet Address   : " + devWallet02.toString());
console.log("Dev 01 Fee              : " + DEV_01_FEE);
console.log("Dev 02 Fee              : " + DEV_02_FEE);

await initialize_payment();
await set_token_address();
await set_dev_wallets();
await set_treasury_wallet();
await set_dev_fees(DEV_01_FEE, DEV_02_FEE);
// await set_pause(true);
// await set_pause(false);

async function initialize_payment() {
  await program.rpc.initialize({
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [admin.keypair, paymentAccount],
  });

  sleep(2000);
}

async function set_token_address() {
  await program.rpc.setTokenAddress(tokenAddress, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });
}

async function set_treasury_wallet() {
  await program.rpc.setTreasuryWallet(treasuryWallet, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });
}

async function set_dev_wallets() {
  await program.rpc.setDevWallets([devWallet01, devWallet02], {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });
}

async function set_dev_fees(dev_01_fee: number, dev_02_fee: number) {
  await program.rpc.setDevFees([dev_01_fee, dev_02_fee], {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });
}

async function set_pause(pause: boolean) {
  await program.rpc.setPause(pause, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });
}

async function getTokenAccount(addr: PublicKey) {
  const TOKEN_MINT = new web3.PublicKey(TOKEN_MINT_ADDRESS);
  const tokenList = await connection.getTokenAccountsByOwner(
    new web3.PublicKey(addr),
    { mint: TOKEN_MINT }
  );

  let paymentTokenAccount = null;
  if (tokenList.value.length > 0) {
    const usdcTokenAccount = tokenList.value[0];
    paymentTokenAccount = usdcTokenAccount.pubkey;
  } else {
    // Create associated token accounts for the new accounts
    paymentTokenAccount = await createAssociatedTokenAccount(
      program.provider.connection,
      admin.keypair,
      TOKEN_MINT,
      addr
    );
  }
  return paymentTokenAccount;
}
