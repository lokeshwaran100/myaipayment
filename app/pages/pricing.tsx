import React from 'react'
import PageBannerStyle from '../components/_App/PageBannerStyle'
import PricingPlanStyle from '../components/PricingPlan/'
import FooterStyleOne from '../components/_App/Footer'
import NavbarStyle from '../components/_App/NavbarStyle'

const Pricing = () => {
    return (
        <>
            <NavbarStyle />
            <PageBannerStyle
                pageTitle="Pricing Plan"
                homePageUrl="/"
                homePageText="Pages"
                activePageText="Pricing Plan"
            />
            <PricingPlanStyle />
            <FooterStyleOne />
        </>
    )
}

export default Pricing;