import React from 'react'
import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Image,
    Flex
} from '@chakra-ui/react'
const TokenInfo = () => {
    return (
        <div id="tokenomics">

            <div className="ptb-100">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">TOKEN INFORMATION</span>
                        <h2>Token Information</h2>
                    </div>
                    <Flex
                        direction={'column'}
                        alignItems={'center'}
                    >

                        <TableContainer
                        >
                            <Table variant='striped'>
                                <Tbody>
                                    <Tr>
                                        <Td>TOKEN NAME</Td>
                                        <Td isNumeric>My Ai Token</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>TOKEN SYMBOL</Td>
                                        <Td isNumeric>MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>TOKEN ADDRESS</Td>
                                        <Td isNumeric>0x40d1E011669c0dc7Dc7c7Fb93E623d6A661Df5Ee</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>CONTRACT ADDRESS</Td>
                                        <Td isNumeric>
                                            <a href="https://bscscan.com/token/0x40d1E011669c0dc7Dc7c7Fb93E623d6A661Df5Ee">
                                                <Image src="/images/Home/bsc-logo.png" height={'20px'} float={'right'} />
                                            </a>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>TOTAL SUPPLY</Td>
                                        <Td isNumeric>180,000,000</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>DIGITS</Td>
                                        <Td isNumeric>9</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>CAN BE BURNED?</Td>
                                        <Td isNumeric>Yes: each Transaction</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>DEVS WILL HOLDS</Td>
                                        <Td isNumeric>2% MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>TRADING FEE</Td>
                                        <Td isNumeric>Liquidity Increases by 4%</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>RESERVED FOR CEX</Td>
                                        <Td isNumeric>40% MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>LISTING ON DEX</Td>
                                        <Td isNumeric>10% MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>LIQUIDITY RESERVE DEX</Td>
                                        <Td isNumeric>30% MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>STAKING & NFT MARKET RESERVE</Td>
                                        <Td isNumeric>16% MyAi</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>LISTING PRICE</Td>
                                        <Td isNumeric>0.0000003 BNB</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>WHITE PAPER</Td>
                                        <Td isNumeric>
                                            <a href="/MyAi-whitepaperv1.1.pdf" target={'_blank'}>
                                                show
                                            </a>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>DEXTOOLS</Td>
                                        <Td isNumeric>
                                            <a href="https://www.dextools.io/app/en/bnb/pair-explorer/0x390d9078cb06f3cd4a17a39693b489446724a093">
                                                <Image src="/images/Home/dextools.png" height={'20px'} float={'right'} />
                                            </a>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>PNCAKESWAP</Td>
                                        <Td isNumeric>
                                            <a href="https://pancakeswap.finance/swap?outputCurrency=0x40d1E011669c0dc7Dc7c7Fb93E623d6A661Df5Ee&inputCurrency=BNB">
                                                <Image src="/images/Home/pancakeSwap.png" height={'20px'} float={'right'} />
                                            </a>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>AIRDROP TG BOT</Td>
                                        <Td isNumeric>
                                            <a href="https://t.me/MyAi_Airdropbot?start=r0896781794">
                                                <Image src="/images/Home/telegram-icon.png" height={'20px'} float={'right'} />
                                            </a>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                </div>
            </div>
        </div>
    )
}

export default TokenInfo;