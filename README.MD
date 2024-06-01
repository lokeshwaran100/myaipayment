# Solana SPL Token Creation and Management

This guide explains the commands required to create and manage a Solana SPL token.

1. Create a New Token
To create a new token, use the following command:
spl-token create-token
This command generates a new token and returns its mint key. In this example, let's assume the token mint key is ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob.

2. Check the Token Supply
To check the total supply of the token, use the command:
spl-token supply ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob
This command will display the current supply of the specified token.

3. Create a Token Account
Create a token account to hold the newly created token:
spl-token create-account ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob
This command creates an associated token account for the given token. Assume the token account public key returned is 9VgPnbr9M98Ze5cRaU4J7rsFRmsw3VnZjFaXAbeNFZ42.

4. Check the Token Balance
To check the balance of the token in the created account, use:
spl-token balance ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob
This command will display the token balance of the specified account.

5. Mint Tokens to the Token Account
To mint a specified amount of tokens to the token account, use:
spl-token mint ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob 10000
This command mints 10,000 tokens to the token account 9VgPnbr9M98Ze5cRaU4J7rsFRmsw3VnZjFaXAbeNFZ42.

6. List All Token Accounts
To list all token accounts associated with the wallet, use:
spl-token accounts
This command displays all the token accounts created for the wallet.

7. Mint Tokens to a Specific Token Account
To mint a specified amount of tokens to a specific token account, use:
spl-token mint ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob 100 448CuwkJh1Z2yzQH4dT7Ae6pHw2ZSx1HZ8wXVs4Pp2Rw
This command mints 100 tokens to the token account 448CuwkJh1Z2yzQH4dT7Ae6pHw2ZSx1HZ8wXVs4Pp2Rw.

By following these steps, you can create and manage your Solana SPL token effectively.
