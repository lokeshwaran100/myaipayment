import React from 'react';
import Link from 'next/link'

const PricingPlanStyle = () => {
    return (
        <>
            <div className="pricing-area pt-100 pb-75">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">PRICING TABLE</span>
                        <h4>Pay With MyAi Token. 50% of paied tokens will be burned</h4>
                        <p></p>
                        <h3>How to access for free of charge: </h3>
                        <h3>1. Stake 2. Take reward 3. Pay with reward</h3>
                        <p></p>
                        <h3>Price will be redused as MyAi token price increases </h3>
                    </div>

                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-pricing-box">
                                <div className="title">
                                    <h3>AI Image</h3>
                                    <p>Powerful Basic AI Imagas</p>
                                </div>
                                <Link href="/image-ai">
                                    <a className="default-btn">AI Image</a>
                                </Link>

                                <ul className="features-list">
                                    <li><i className="ri-check-line"></i> One day access 100 MyAi</li>
                                    <li><i className="ri-check-line"></i> One week access 500 MyAi</li>
                                    <li><i className="ri-check-line"></i> One month access 2000 MyAi</li>
                                    <li><i className="ri-check-line"></i> 10 image generation 30 MyAi</li>
                                    <li><i className="ri-check-line"></i> Unlimited access 50,000 MyAi</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-pricing-box active">
                                <div className="title">
                                    <h3>Chat MyAi</h3>
                                    <p>Chat with AI</p>
                                </div>


                                <Link href="/chat-ai">
                                    <a className="default-btn">Chat MyAi</a>
                                </Link>

                                <ul className="features-list">
                                    <li><i className="ri-check-line"></i> 1 hour access 100 MyAi</li>
                                    <li><i className="ri-check-line"></i> Unlimited access 50,000 MyAi</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-pricing-box">
                                <div className="title">
                                    <h3>AI Image "Coming Soon"</h3>
                                    <p>Powerful Adanced AI Imagas</p>
                                </div>
                                <Link href="/image-ai">
                                    <a className="default-btn">AI Image</a>
                                </Link>

                                <ul className="features-list">
                                    <li><i className="ri-check-line"></i> One day access 1000 MyAi</li>
                                    <li><i className="ri-check-line"></i> One week access 5000 MyAi</li>
                                    <li><i className="ri-check-line"></i> One month access 10000 MyAi</li>
                                    <li><i className="ri-check-line"></i> 10 image generation 300 MyAi</li>
                                    <li><i className="ri-check-line"></i> Unlimited access 100,000 MyAi</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-pricing-box">
                                <div className="title">
                                    <h3>For Business</h3>
                                    <p>Custom AI Indexing & models</p>
                                </div>

                                <Link href="/#">
                                    <a className="default-btn">Custom AI</a>
                                </Link>

                                <ul className="features-list">
                                    <li><i className="ri-check-line"></i> Chat AI Custom Indexing 5 million MyAi</li>
                                    <li><i className="ri-check-line"></i> Custom AI Image Models 5 million MyAi</li>
                                    <li><i className="ri-check-line"></i> Price will be redused as token price increases</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PricingPlanStyle;