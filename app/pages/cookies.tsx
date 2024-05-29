import React from 'react'
import NavbarStyle from '../components/_App/NavbarStyle'
import PageBannerStyle from '../components/_App/PageBannerStyle'
import FooterStyleOne from '../components/_App/Footer'
import { Flex, Text } from '@chakra-ui/react'

const PrivacyPolicy = () => {
    return (
        <>
            <NavbarStyle />

            <PageBannerStyle
                pageTitle="COOKIES"
                homePageUrl="/"
                homePageText="Pages"
                activePageText="Cookies"
            />

            <Flex
                paddingTop={'100px'}
                paddingBottom={'100px'}
            >
                <Flex className="container">
                    <Flex
                        direction={'column'}
                    >
                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                        >
                            What is a Cookies Policy?
                        </Flex>
                        <Text>
                            Our website address is: <a href="https://MyAi.zone">https://MyAi.zone </a>
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            Do You Legally Need a Cookies Policy?
                        </Flex>
                        <Text>
                            When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
                        </Text>
                        <Text>
                            An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: <a href="https://automattic.com/privacy/">https://automattic.com/privacy/</a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.
                        </Text>



                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            United States
                        </Flex>
                        <Text>
                            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
                        </Text>



                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            European Union
                        </Flex>
                        <Text>
                            If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
                        </Text>
                        <Text>
                            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
                        </Text>
                        <Text>
                            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
                        </Text>
                        <Text>
                            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            What Should be Included in Your Cookies Policy?
                        </Flex>
                        <Text>
                            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                        </Text>
                        <Text>
                            These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            Definition of Cookies
                        </Flex>
                        <Text>
                            If you request a password reset, your IP address will be included in the reset email.
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            What You Use the Cookies For
                        </Flex>
                        <Text>
                            If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
                        </Text>
                        <Text>
                            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            How Users can Opt Out or Adjust Settings
                        </Flex>
                        <Text>
                            If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
                        </Text>


                        <Flex
                            fontSize={'22px'}
                            marginBottom={'15px'}
                            marginTop={'25px'}
                        >
                            Cookies Notice When Asking for Consent
                        </Flex>

                        <Text>
                            Visitor comments may be checked through an automated spam detection service.
                        </Text>

                    </Flex>
                </Flex>
            </Flex>

            <FooterStyleOne />
        </>
    )
}

export default PrivacyPolicy;