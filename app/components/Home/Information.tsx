import React from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const Information = () => {
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const desc1 = "Artificial intelligence (AI) and blockchain are two transformative technologies that have gained significant attention in recently. AI refers to the ability of machines to perform intelligent tasks, such as learning, reasoning, and problem-solving, while blockchain is a distributed ledger technology that provides a transparent, immutable, and decentralized framework for recording and verifying transactions. Both AI and blockchain have the potential to revolutionize various industries, and their integration can unlock new possibilities and create innovative applications.The integration of AI and blockchain can bring numerous benefits to businesses and society. For example, AI can improve the accuracy and efficiency of data analysis and decision-making in blockchain networks, leading to better transparency, accountability, and automation. Blockchain, on the other hand, can enhance the security, privacy, and integrity of data used by AI models, mitigating concerns about data manipulation, fraud, and unauthorized access. The combination of AI and blockchain can also enable new business models, such as decentralized AI marketplaces, where data and AI models can be traded securely and transparently.";
    const desc2 = "Despite the potential benefits, integrating AI and blockchain also presents challenges and limitations. These include issues related to data privacy, interoperability, scalability, and regulatory compliance. For example, the decentralized nature of blockchain may pose challenges in complying with data privacy regulations, such as the European Union's General Data Protection Regulation (GDPR). Interoperability can be a challenge when integrating AI models with different blockchain platforms, and scalability can be an issue when dealing with large-scale AI computations on blockchain networks. In this whitepaper, MyAi introduce a framework for integrating AI and blockchain technologies, addressing the challenges and limitations associated with this integration. We discuss the potential benefits of AI and blockchain integration, including improved data accuracy, security, and privacy, as well as enhanced decision-making and automation. We also provide recommendations for overcoming the challenges, including the use of privacy-preserving techniques, standardization efforts, and scalability solutions. Finally, we present several use cases where AI and blockchain integration can have a transformative including impact, marketing, education, customer service, supply chain management, healthcare, finance, and digital identity verification."
    return (
        <>
            <div className="features-area ptb-75 ">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">PROJECT INFORMATION</span>
                        <h2>Project Information</h2>
                    </div>
                    {/* MyAi project propose a novel approach that combines AI text-to-image generation with AI chat, AI text to video, AI Blockchain integration further use of AI powered Education, Marketing and Customer service index integration leveraging the capabilities of AI-generated images to enhance the AI chat experience. We provide a detailed technical framework for integrating AI text-to-image, text to video generation into AI chat systems, including architecture, data requirements, training methodologies, and evaluation metrics. We also discuss potential use cases, ethical considerations, and recommendations for responsible deployment of these technologies. */}
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-6 col-sm-6 col-md-6">
                            <div className="single-features-item feature1 bg-f9f9f9">
                                <div className="icon bg6">
                                    <i className="ri-customer-service-fill"></i>
                                </div>
                                <h3>Integrating of AI and Blockchain</h3>
                                <p>
                                    {showMore1 ? desc1 : `${desc1.substring(0, 410)}`}

                                    <Text
                                        onClick={() => setShowMore1(!showMore1)}
                                        cursor={'pointer'}
                                        textDecoration={'underline'}
                                    >
                                        {showMore1 ? "Show less" : "Show more"}
                                    </Text>

                                </p>

                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-sm-6 col-md-6">
                            <div className="single-features-item feature4 bg-f9f9f9">
                                <div className="icon bg5">
                                    <i className="ri-user-5-fill"></i>
                                </div>
                                <h3>Challange of integrating AI and blockchain</h3>
                                <p></p>

                                    <p>
                                    {showMore2 ? desc2 : `${desc2.substring(0, 395)}`}

                                    <Text
                                        onClick={() => setShowMore2(!showMore2)}
                                        cursor={'pointer'}
                                        textDecoration={'underline'}
                                    >
                                        {showMore2 ? "Show less" : "Show more"}
                                    </Text>

                                </p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information;