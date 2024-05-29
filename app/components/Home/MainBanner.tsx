import React from 'react'
import {
    Flex,
} from '@chakra-ui/react'

const MainBanner = () => {
    return (
        <>
            <div className="main-banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="main-banner-content">
                                <div className="content">
                                    <h1>Future of AI is here</h1>
                                    <h3>
                                        <i className="ri-shield-check-fill"></i>
                                        Integrate AI to The Blockchain. Deploy AI nodes for faster respond time,
                                        Developing latest SYNC MiAi to AI bot chat, Training AI for many deferent levels from chat,
                                        marketing, education, SEO, Machine Learning to perfect image and video rendering solution,
                                        Developing low cost API and website where MyAi token owners able to generate AI Images for free and mint them as high quality NFT as an exclusive owners.
                                    </h3>
                                    <br />
                                    <span className="sub-title">
                                        <i className="ri-award-fill"></i>
                                        Generated Images can be Minted on MyAi NFT Marketplace.
                                        NFT metadata will be kept from original AI dApp as creator on MyAi.zone<br />
                                        As well as owner and creator data as users prefers.
                                    </span>

                                    <Flex
                                        direction={'row'}
                                        alignItems={'center'}
                                        marginTop={'20px'}
                                    >
                                        <h3>
                                            <b>dApps:</b>
                                        </h3>
                                        <a className='default-btn' href="/image-ai">Image AI</a>
                                        <a className='default-btn' href="/chat-ai">Chat MyAI</a>
                                        <a className='default-btn' href="https://stake.myai.zone/">Staking</a>
                                        <a className='default-btn' href="/">More coming soon</a>
                                    </Flex>
                                    <br />
                                    <span className="sub-title">
                                        <b>And more come to</b>
                                    </span>
                                </div>

                                {/* Trusted Partners Component */}
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="main-banner-image">
                                <img src="/images/Home/1.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

export default MainBanner;