import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  RadioGroup,
  Radio,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useCallback, useState, useEffect } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi';
import axios from 'axios';
import { now } from 'moment';
import { toast } from 'react-toastify';
import { PriceData } from '../../utils/constants';
import { BigNumber, ethers } from 'ethers';
import { useDappContext } from '../../utils/Context';
import { contractAddresses, polygonMainnetChainId, bscTestnetChainId, tokenAddresses, decimals, bscMainnetChainId } from '../../utils/config';
import tokenContractAbi from '../../assets/abis/Token-abi.json';
import contractAbi from '../../assets/abis/MyAIPayment-abi.json';

import * as anchor from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccount } from '@solana/spl-token';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';



export type BuyModalProps = {
  isOpenBuyModal: boolean,
  onCloseBuyModal(): void,
  // announceText: string,
  // announceLogo: string,
}

const owner: Keypair = new Keypair();
const provider = anchor.getProvider();

const connection: Connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed");
const idl = JSON.parse(
  require("fs").readFileSync("../../assets/idls/MyAIPayment.json", "utf8")
);
const programId = new PublicKey("2zUiVTAqWHxn7BT3FPcn4L3BNezeUoyKpGuqCbxHjPdp");
const program = new anchor.Program(idl, programId, provider);

export const getTokenAccount = async (addr: PublicKey) => {
  const TOKEN_MINT = new PublicKey("ExwSdKk455aTyJ6poApJ4gVCrS57vyexGDDc6qeGGPob");
  const tokenList = await connection.getTokenAccountsByOwner(addr, { mint: TOKEN_MINT });

  if (tokenList.value.length > 0) {
    return tokenList.value[0].pubkey;
  } else {
    return await createAssociatedTokenAccount(connection, owner, TOKEN_MINT, addr);
  }
};

const sendToken = async (depositAmount: number) => {
  const payer = new Keypair();
  const paymentAccount = new PublicKey("");
  const treasuryWallet = new PublicKey("");
  const devWallet01 = new PublicKey("");
  const devWallet02 = new PublicKey("");

  const txSignature = await program.rpc.sendToken(
    new anchor.BN(depositAmount),
    {
      accounts: {
        payer: payer.publicKey,
        payment: paymentAccount,
        payerTokenAccount: await getTokenAccount(payer.publicKey),
        treasuryWalletTokenAccount: await getTokenAccount(treasuryWallet),
        devWallet1TokenAccount: await getTokenAccount(devWallet01),
        devWallet2TokenAccount: await getTokenAccount(devWallet02),
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [payer],
    }
  );

  await connection.getTransaction(txSignature, { commitment: 'confirmed' });
  console.log('Token sent successfully');
};

const BuyModal = ({
  isOpenBuyModal,
  onCloseBuyModal,
  // announceText,
  // announceLogo,
}: BuyModalProps) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const [payOption, setPayOption] = useState('4');
  const [imageNum, setImageNum] = useState(10);
  const [chatTime, setChatTime] = useState(1);
  const [price, setPrice] = useState(100);
  const { address, } = useAccount();
  const [isApproved, setIsApproved] = useState(false);
  const {
    isBuy,
    setIsBuy
  } = useDappContext();

  useEffect(() => {
    if (isOpenBuyModal) {
      toast.success('Please click approve button after selecting proper plan');
    }
  }, [isOpenBuyModal])

  useEffect(() => {
    if (payOption == '4') {
      setPrice(imageNum * PriceData[4]);
    } else if (payOption == '5') {
      setPrice(chatTime * PriceData[5]);
    } else {
      setPrice(PriceData[Number(payOption)]);
    }
  }, [payOption, imageNum, chatTime])

  useEffect(() => {
    getExpireDate();
  }, [])

  const getExpireDate = async () => {
    let params = { wallet_address: address };
    const response = (await axios.post("/api/account_info/get", params)).data;
    console.log("response: ", response);

    let expire_date = new Date(now());
    let days = 0;
    if (payOption == '1') {
      days = 1;
    } else if (payOption == '2') {
      days = 7;
    } else if (payOption == '3') {
      days = 30;
    }

    expire_date.setDate(expire_date.getDate() + days);
    let UTC_date = expire_date.toISOString();
    return UTC_date;
  }

  const handleApprove = async () => {
    if (chain?.id == undefined || chain?.id !=
      (process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscMainnetChainId : bscTestnetChainId)) {
      toast.error('Please switch your chain');
      return;
    }

    const chainId = chain?.id ?? (process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscMainnetChainId : bscTestnetChainId);
    try {
      const tokenContractAddress = (tokenAddresses as any)[chainId];
      const contractAddress = (contractAddresses as any)[chainId];

      console.log("tokenContractAddress: ", tokenContractAddress);
      console.log("contractAddress: ", contractAddress);
      console.log("price: ", ethers.BigNumber.from(price).mul((ethers.BigNumber.from(10)).pow(9)).toString())

      // approve
      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenContractAbi,
        (signer?.provider as any)?.getSigner()
      );
      let tx = await tokenContract.approve(
        contractAddress,
        ethers.BigNumber.from(price).mul((ethers.BigNumber.from(10)).pow(9)).toString(),
      );
      await tx.wait();
      console.log('Approve success');
      setIsApproved(true);
      toast.success('Approve success. Please click Buy Button');
    } catch (e) {
      console.log("error happened in approve: ", e);
    }
  }

  const handleBuy = async () => {
    if (chain?.id == undefined || chain?.id !=
      (process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscMainnetChainId : bscTestnetChainId)) {
      toast.error('Please switch your chain');
      return;
    }
    if (!isApproved) {
      toast.error('Please click approve button at first');
      return;
    }

    const chainId = chain?.id ?? (process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscMainnetChainId : bscTestnetChainId);
    try {
      // buy
      const contractAddress = (contractAddresses as any)[chainId];

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        (signer?.provider as any)?.getSigner()
      );
      let tx = await contract.sendToken(
        ethers.BigNumber.from(price).mul((ethers.BigNumber.from(10)).pow(9)).toString()
      );
      await tx.wait();
      console.log('Transfer success')

      await sendToken(price);

      await writeBuyDataToDB();

    } catch (e) {
      console.log("error happened: ", e);
    }
  }

  const writeBuyDataToDB = async () => {

    console.log("expired date: ", await getExpireDate());

    let params = {
      type: Number(payOption),
      wallet_address: address,
      expire_date: await getExpireDate(),
      price: price
    };
    const response = await axios.post("/api/account_info/buy", params);

    if (response.data == "success") {
      toast.success("Buy Success!");
      setIsBuy(true);
    } else {
      toast.error("Buy Failed!");
    }
    onCloseBuyModal();
    setIsApproved(false);
  };

  return (
    <Modal isOpen={isOpenBuyModal} onClose={onCloseBuyModal}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'

        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        bg="gray.100"
        border="1px solid #ED2775"
        borderRadius={'15px'}
        color={'black'}
      >
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
            mt={'50px'}
          >
            <Flex
              fontSize={'20px'}
              textAlign={'left'}
              background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
              marginBottom={'30px'}
              letterSpacing={'0.1em'}
              fontWeight={'600'}
              backgroundClip={'text'}
              color={'transparent'}
            >
              Please select pay option.
            </Flex>
            <Flex
              direction={'column'}
              borderTop="1px solid #ED2775"
              padding={'30px'}
            >
              <Flex
                fontSize={'18px'}
                textAlign={'left'}
                background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
                marginBottom={'20px'}
                letterSpacing={'0.1em'}
                fontWeight={'600'}
                backgroundClip={'text'}
                color={'transparent'}
              >
                For Image
              </Flex>
              <RadioGroup onChange={setPayOption} value={payOption}>
                <Stack direction='column'>
                  <Radio value='1' size='lg'>One Day access</Radio>
                  <Radio value='2' size='lg'>One Week access</Radio>
                  <Radio value='3' size='lg'>One Month access</Radio>
                  <Radio value='4' size='lg'>Custom</Radio>
                </Stack>
                {/* <Radio value='4'>Third</Radio> */}
              </RadioGroup>
              <Flex
                direction={'row'}
                alignItems={'center'}
                opacity={payOption != '4' ? '0.5' : '1'}
              >

                AI Image Count
                <NumberInput
                  // defaultValue={10}
                  // max={10}
                  // keepWithinRange={false}
                  // clampValueOnBlur={false}
                  min={10}
                  //@ts-ignore
                  onChange={setImageNum}
                  isDisabled={payOption != '4' ? true : false}
                  width={'100px'}
                  marginLeft={'10px'}
                  value={imageNum}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>

            </Flex>
            <Flex
              direction={'column'}
              borderTop="1px solid #ED2775"
              borderBottom="1px solid #ED2775"
              // borderRadius={'15px'}
              padding={'30px'}
            >
              <Flex
                fontSize={'18px'}
                textAlign={'left'}
                background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
                marginBottom={'20px'}
                letterSpacing={'0.1em'}
                fontWeight={'600'}
                backgroundClip={'text'}
                color={'transparent'}

              >
                For Chat
              </Flex>
              <RadioGroup onChange={setPayOption} value={payOption}>
                <Stack direction='column'>
                  <Radio value='5' size='lg'>Custom</Radio>
                </Stack>
              </RadioGroup>
              <Flex
                direction={'row'}
                alignItems={'center'}
                opacity={payOption != '5' ? '0.5' : '1'}
              >

                Chat MyAI Hours
                <NumberInput
                  // defaultValue={10}
                  // max={10}
                  // keepWithinRange={false}
                  // clampValueOnBlur={false}
                  min={1}
                  //@ts-ignore
                  onChange={setChatTime}
                  isDisabled={payOption != '5' ? true : false}
                  width={'100px'}
                  marginLeft={'10px'}
                  value={chatTime}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>

            </Flex>
            <Text
              marginTop={'20px'}
              fontSize={'20px'}
              fontWeight={'500'}
            >
              Price : {price} MyAI
            </Text>
            <Flex
              direction={'row'}
              alignItems={'center'}
              margin={'20px 0'}
              gap={'20px'}
            >
              <button
                className={'default-btn'}
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className={'default-btn'}
                onClick={handleBuy}
                disabled={!isApproved}
                style={{
                  opacity: isApproved ? 1 : 0.6
                }}
              >
                Buy
              </button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BuyModal
