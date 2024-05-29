import React from 'react';
import NavbarStyle from '../components/_App/NavbarStyle';
import MainBanner from '../components/Home/MainBanner';
import FooterStyleOne from '../components/_App/Footer';
import TokenInfo from '../components/Home/TokenInfo';
import Roadmap from '../components/Home/Roadmap'
import Team from '../components/Home/Team'
import Service from '../components/Home/Service'
import Information from '../components/Home/Information'
const IndexPage = () => {
    return (
        <div>
            <NavbarStyle />
            <MainBanner />
            <Information />
            <Service />
            <Team />
            <Roadmap />
            <TokenInfo />
            <FooterStyleOne />
        </div>
    )
}

export default IndexPage;