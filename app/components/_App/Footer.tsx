// Footer Component Style File Path: public/css/pages-and-components-css/footer.scss

import React from 'react';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Flex className="footer-area"
            >
                <div className="container">
                    <div className="footer-content">
                        <Link href="/">
                            <a className="logo">
                                <img src="/images/logo.png" alt="logo" />
                            </a>
                        </Link>

                        <ul className="social-links">

                            <li>
                                <a href="https://twitter.com/MyAirobo" target="_blank">
                                    <i className="ri-twitter-fill"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/my-ai-2967a2266/" target="_blank">
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://t.me/myaitoken" target="_blank">
                                    <i className="ri-telegram-fill"></i>
                                </a>
                            </li>
                            <li>
                                <a href="mailto: ai@MyAi.zone" target="_blank">
                                    <i className="ri-mail-fill"></i>
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/privacy-policy">
                                    <a className="nav-link">Privacy Policy</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/cookies">
                                    <a className="nav-link">Cookies</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/terms-conditions">
                                    <a className="nav-link">Terms & Conditions</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/disclaimer">
                                    <a className="nav-link">Disclaimer & User Warranties</a>
                                </Link>
                            </li>
                        </ul>

                        <p className="copyright">Copyright &copy; {currentYear} <strong>MyAI</strong>. All Rights Reserved by <a href="#" target="_blank">MyAI TEAM</a></p>
                    </div>
                </div>
            </Flex>
        </>
    );
}

export default Footer;