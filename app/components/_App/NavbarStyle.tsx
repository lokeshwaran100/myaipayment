import {
    Image,
} from '@chakra-ui/react';
import React from "react";
import Link from '../../utils/ActiveLink';
import Account from "./Account";
import { useRouter } from 'next/router';
// import { useAccount } from 'wagmi';
import { useWallet } from "@solana/wallet-adapter-react";

const NavbarStyle = () => {
    const [menu, setMenu] = React.useState(true)
    const router = useRouter()

    const toggleNavbar = () => {
        setMenu(!menu)
    }

    React.useEffect(() => {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (elementId) {
                if (window.scrollY > 170) {
                    elementId.classList.add("is-sticky");
                } else {
                    elementId.classList.remove("is-sticky");
                }
            }
        });
    })
    // const { address, } = useAccount();
    const {publicKey}=useWallet();
    const address = publicKey ? publicKey.toString() : "Unknown";

    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <>
            <div id="navbar" className="navbar-area navbar-area navbar-style-two">
                <div className="texap-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light bg-light">

                            <Link href="/">
                                <a className="navbar-brand">
                                    <Image src="/images/logo.png" alt="logo" opacity={(address && window.innerWidth < 540 && (router.pathname.includes('/image-ai') || router.pathname.includes('/chat-ai'))) ? '0' : '1'} />
                                </a>
                            </Link>

                            <button
                                onClick={toggleNavbar}
                                className={classTwo}
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href="/" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">
                                                Home
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/dapp">
                                            <a onClick={e => e.preventDefault()} className="dropdown-toggle nav-link">
                                                DApp
                                            </a>
                                        </Link>

                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link href="/image-ai" activeClassName="active">
                                                    <a onClick={toggleNavbar} className="nav-link">Image AI</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link href="/chat-ai" activeClassName="active">
                                                    <a onClick={toggleNavbar} className="nav-link">Chat MyAI V.1.0</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="https://stake.myai.zone/" activeClassName="active">
                                                    <a onClick={toggleNavbar} className="nav-link">Staking</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/#roadmap" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">
                                                Roadmap
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/#team" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">
                                                Team
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/#tokenomics" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">
                                                Tokenomics
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#">
                                            <a onClick={e => e.preventDefault()} className="dropdown-toggle nav-link">
                                                Pages
                                            </a>
                                        </Link>

                                        <ul className="dropdown-menu">
                                            {/* <li className="nav-item">
                                                <Link href="/blog" activeClassName="active">
                                                    <a onClick={toggleNavbar} className="nav-link">Blog</a>
                                                </Link>
                                            </li> */}
                                            <li>
                                                <Link href="/pricing" activeClassName="active">
                                                    <a onClick={toggleNavbar}>Pricing Plan</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/privacy-policy" activeClassName="active">
                                                    <a onClick={toggleNavbar}>Privacy Policy</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/cookies" activeClassName="active">
                                                    <a onClick={toggleNavbar}>Cookies</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/terms-conditions" activeClassName="active">
                                                    <a onClick={toggleNavbar}>Terms & Conditions</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/disclaimer" activeClassName="active">
                                                    <a onClick={toggleNavbar}>Disclaimer & User Warranties</a>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            {router.pathname.includes('/image-ai') || router.pathname.includes('/chat-ai') ?
                                (
                                    <div className="others-options">
                                        <Account />
                                    </div>
                                ) : (<></>)
                            }

                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavbarStyle;