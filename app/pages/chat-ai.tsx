import {  
  Flex,
  Button
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import NavbarStyle from '../components/_App/NavbarStyle'
import PageBannerStyle from '../components/_App/PageBannerStyle'

const Home: NextPage = () => {
  const router = useRouter()
  const [ paidVersion, setPaidVersion ] = useState(false)
  // route to the disclaimer page when user arrives to the site for the first time and only once
  useEffect(() => {

  }, [])

  const swithChatversion = (value: boolean) => {
    setPaidVersion(value)
  }

  return (
    <>
      <NavbarStyle />

      <PageBannerStyle
        pageTitle={paidVersion ? "Chat MyAI V.2.0 " : "Chat MyAI V.1.0" }
        homePageUrl="/"
        homePageText="DApp"
        activePageText={paidVersion ? "Chat MyAI V.2.0 " : "Chat MyAI V.1.0" }
      />
       {/* <Flex
      >
         <Button
            width={'100px'}
            margin={'5px'}
            color={'white'}
            onClick={() => swithChatversion(false)}
            background={'#ED64A6'}
            transition={'.3s'}
            _hover={{
              background: '#ED2775',
              transform: 'translateY(-3px)'
            }}
            _active={{
              background: '#ED2775'
            }}
          >
            GPT 3.5
        </Button>
        <Button
            width={'100px'}
            margin={'5px'}
            color={'white'}
            onClick={() => swithChatversion(true)}
            background={'#ED64A6'}
            transition={'.3s'}
            _hover={{
              background: '#ED2775',
              transform: 'translateY(-3px)'
            }}
            _active={{
              background: '#ED2775'
            }}
          >
            GPT 4
        </Button>
      </Flex> */}
      <Flex
        direction={'column'}
        width={'100%'}
      >
          <Chat version="free"/>
      </Flex>
    </>
  )
}

export default Home
