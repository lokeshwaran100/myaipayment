import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  createAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const TOKEN_MINT_ADDRESS = "ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob";

// // Configure the connection to the cluster
// const provider = anchor.Provider.env();
// const idl = JSON.parse(
//   require("fs").readFileSync("./target/idl/abi.json", "utf8")
// );
// const programId = new PublicKey("<Your_Program_ID>");
// const program = new anchor.Program(idl, programId, provider);
// const admin = provider.wallet.publicKey;

const admin = pg.wallet;
const program = pg.program;

// Get the secret key in string format
// const secretKeyHexString = Buffer.from(admin.keypair.secretKey).toString("hex");
// console.log("Secret Key:", secretKeyHexString);

const paymentAccount = anchor.web3.Keypair.generate();
// const depositorTokenAccount = await getTokenAccount(paymentAccount.publicKey);

// const secretKey = new Uint8Array([
//   218, 61, 181, 179, 3, 125, 90, 34, 71, 79, 79, 220, 110, 30, 129, 196, 30,
//   235, 77, 160, 0, 61, 139, 197, 146, 63, 224, 101, 130, 250, 211, 167, 186,
//   152, 192, 121, 11, 56, 99, 205, 138, 248, 125, 218, 183, 154, 30, 28, 236,
//   219, 221, 205, 72, 219, 114, 22, 50, 8, 165, 16, 134, 114, 169, 139,
// ]);
// const payer = web3.Keypair.fromSecretKey(secretKey);

// console.log(payer.publicKey.toString());
// console.log(depositorTokenAccount.toString());
const depositAmount = new anchor.BN(1 * LAMPORTS_PER_SOL);

const secretKey = new Uint8Array([
  218, 61, 181, 179, 3, 125, 90, 34, 71, 79, 79, 220, 110, 30, 129, 196, 30,
  235, 77, 160, 0, 61, 139, 197, 146, 63, 224, 101, 130, 250, 211, 167, 186,
  152, 192, 121, 11, 56, 99, 205, 138, 248, 125, 218, 183, 154, 30, 28, 236,
  219, 221, 205, 72, 219, 114, 22, 50, 8, 165, 16, 134, 114, 169, 139,
]);
const payer = web3.Keypair.fromSecretKey(secretKey);
const depositorTokenAccount = await getTokenAccount(payer.publicKey);
// const paymentAccountName = "5";
// const [paymentAccount, bump] = await web3.PublicKey.findProgramAddress(
//   [
//     anchor.utils.bytes.utf8.encode(paymentAccountName),
//     admin.publicKey.toBuffer(),
//   ],
//   pg.program.programId
// );
// const paymentTokenAccount = await getTokenAccount(paymentAccount);
const adminTokenAccount = await getTokenAccount(admin.publicKey);
// console.log(paymentTokenAccount.toString());

const newAdmin = anchor.web3.Keypair.generate();
const tokenAddress = new anchor.web3.PublicKey(TOKEN_MINT_ADDRESS);
const treasuryWallet = anchor.web3.Keypair.generate().publicKey;
const devWallet01 = anchor.web3.Keypair.generate().publicKey;
const devWallet02 = anchor.web3.Keypair.generate().publicKey;

// await fund_depositor();
await initialize_payment();
await set_token_address();
await set_dev_wallets();
await set_treasury_wallet();
await set_dev_fees();
await set_pause();
await transferSPLToken();
await send_token();
// await set_admin();

async function initialize_payment() {
  await program.rpc.initialize({
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [admin.keypair, paymentAccount],
  });

  await display("After initialization");
  await displayPda();
}

async function set_admin() {
  display("New Admin        : " + newAdmin.publicKey.toString());
  await program.rpc.setAdmin(newAdmin.publicKey, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  await display("After Setting New Admin");
  await displayPda();
}

async function set_token_address() {
  display("Token             : " + tokenAddress.toString());
  await program.rpc.setTokenAddress(tokenAddress, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  await display("After Setting New Admin");
  await displayPda();
}

async function set_treasury_wallet() {
  await program.rpc.setTreasuryWallet(treasuryWallet, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  display("Treasury Wallet     : " + (await getTokenAccount(treasuryWallet)));

  await display("After Setting Treasury Wallets");
  await displayPda();
}

async function set_dev_wallets() {
  await program.rpc.setDevWallets([devWallet01, devWallet02], {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  display("Dev Wallet 01     : " + (await getTokenAccount(devWallet01)));
  display("Dev Wallet 02     : " + (await getTokenAccount(devWallet02)));

  await display("After Setting Dev Wallets");
  await displayPda();
}

async function set_dev_fees() {
  await program.rpc.setDevFees([20, 10], {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  await display("After Setting Dev Fees");
  await displayPda();
}

async function set_pause() {
  await program.rpc.setPause(true, {
    accounts: {
      payment: paymentAccount.publicKey,
      admin: admin.publicKey,
    },
    signers: [admin.keypair],
  });

  await display("After Setting Pause");
  await displayPda();
}

async function send_token() {
  const txSignature = await program.rpc.sendToken(
    new anchor.BN(depositAmount),
    {
      accounts: {
        payer: payer.publicKey,
        payment: paymentAccount.publicKey,
        payerTokenAccount: await getTokenAccount(payer.publicKey),
        treasuryWalletTokenAccount: await getTokenAccount(treasuryWallet),
        devWallet1TokenAccount: await getTokenAccount(devWallet01),
        devWallet2TokenAccount: await getTokenAccount(devWallet02),
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [payer],
    }
  );

  await connection.getTransaction(txSignature, {
    commitment: "confirmed",
  });

  await display("After Sending Token");
  await displayPda();
}

// async function withdraw_sol() {
//   const withdrawAmount = new anchor.BN(0.001 * LAMPORTS_PER_SOL);

//   const txSignature = await program.rpc.withdraw(
//     new anchor.BN(withdrawAmount),
//     Buffer.from("SOL"),
//     {
//       accounts: {
//         paymentAccount: paymentAccount.publicKey,
//         paymentTokenAccount: paymentTokenAccount,
//         authority: admin.publicKey,
//         toAccount: admin.publicKey,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       },
//       signers: [admin.keypair, paymentAccount],
//     }
//   );

//   await connection.getTransaction(txSignature, {
//     commitment: "confirmed",
//   });

//   await display("After Withdraw Sol");
//   await displayPda();
// }

// async function deposit_usdc() {
//   const txSignature = await program.rpc.depositUsdc(
//     new anchor.BN(1 * 1000000),
//     {
//       accounts: {
//         payer: admin.publicKey,
//         depositorTokenAccount: adminTokenAccount,
//         paymentTokenAccount: paymentTokenAccount,
//         paymentAccount: paymentAccount.publicKey,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       },
//       signers: [admin.keypair],
//     }
//   );

//   await connection.getTransaction(txSignature, {
//     commitment: "confirmed",
//   });

//   await display("After Depositing USDC");
//   await displayPda();
// }

// async function withdraw_usdc() {
//   const withdrawAmount = new anchor.BN(1 * 1000000);

//   const txSignature = await program.rpc.withdraw(
//     new anchor.BN(withdrawAmount),
//     Buffer.from("USDC"),
//     {
//       accounts: {
//         paymentAccount: paymentAccount.publicKey,
//         paymentTokenAccount: paymentTokenAccount,
//         authority: admin.publicKey,
//         toAccount: adminTokenAccount,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       },
//       signers: [admin.keypair, paymentAccount],
//     }
//   );

//   await connection.getTransaction(txSignature, {
//     commitment: "confirmed",
//   });

//   await display("After Withdraw USDC");
//   await displayPda();
// }

async function display(message: String) {
  console.log("\n", message);
  // console.log(
  //   "Admin Balance  : ",
  //   await connection.getBalance(admin.publicKey)
  // );
}

async function displayPda() {
  const payment_account = await program.account.myAiPayment.fetch(
    paymentAccount.publicKey
  );
  console.log("Admin          : ", payment_account.admin.toString());
  console.log("Token Address  : ", payment_account.token.toString());
  console.log("Dev Fees       : ", payment_account.devFees.toString());
  console.log("Pause          : ", payment_account.paused.toString());
  console.log("Treasury       : ", payment_account.treasuryWallet.toString());
  console.log("Dev Wallet 01  : ", payment_account.devWallets[0].toString());
  console.log("Dev Wallet 02  : ", payment_account.devWallets[1].toString());
  // console.log("Authority    : ", payment_account.authority.toString());

  // console.log(
  //   "Escrow Balance : ",
  //   await connection.getBalance(paymentAccount.publicKey)
  // );
}

async function fund_depositor() {
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: admin.publicKey,
      toPubkey: payer.publicKey,
      lamports: 0.003 * web3.LAMPORTS_PER_SOL,
    })
  );
  await web3.sendAndConfirmTransaction(connection, transaction, [
    admin.keypair,
  ]);
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

async function transferSPLToken() {
  // Generate a new keypair for the sender (or use an existing one)
  const fromWallet = admin.keypair;
  // Generate a new keypair for the recipient (or use an existing one)
  const toWallet = payer;

  // Token mint address (replace this with your actual token mint address)
  // const mintAddress = new PublicKey(TOKEN_MINT_ADDRESS);

  // Create associated token accounts for the sender and the recipient
  const fromTokenAccount = await getTokenAccount(fromWallet.publicKey);
  const toTokenAccount = await getTokenAccount(toWallet.publicKey);

  // Mint some tokens to the sender's token account for testing
  // await mint.mintTo(fromTokenAccount.address, fromWallet.publicKey, [], 1000000);

  // Log the initial balances
  // console.log('Initial balance of fromTokenAccount:', await connection.getTokenAccountBalance(fromTokenAccount.value.amount);
  // console.log('Initial balance of toTokenAccount:', toTokenAccountInfo.amount.toNumber());

  // Specify the amount to transfer (in smallest units, e.g., lamports for SOL)
  const amount = 10 * LAMPORTS_PER_SOL; // Adjust this amount based on your requirements

  // Create the transaction to transfer tokens
  const transaction = new web3.Transaction().add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromWallet.publicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  // Send the transaction
  await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
  console.log("Deposited");

  // // Log the final balances
  // const fromTokenAccountInfoAfter = await mint.getAccountInfo(fromTokenAccount.address);
  // const toTokenAccountInfoAfter = await mint.getAccountInfo(toTokenAccount.address);
  // console.log('Final balance of fromTokenAccount:', fromTokenAccountInfoAfter.amount.toNumber());
  // console.log('Final balance of toTokenAccount:', toTokenAccountInfoAfter.amount.toNumber());
}
