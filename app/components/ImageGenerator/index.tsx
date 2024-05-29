import {
    Flex, Text
} from '@chakra-ui/react';
import GeneratorStyleContainer from './GeneratorStyleContainer';
import GeneratorResultContainer from './GeneratorResultContainer';
const ImageGenerator = () => {

    return (
        <>
        
            <Flex
                direction={'column'}
                // alignItems={'center'}
                // background={'rgba(255, 255, 255, 0.0321753)'}
                // border={'5px solid rgba(255, 255, 255, 0.0545484)'}
                // backdropFilter={'blur(6.7957px)'}
                // borderRadius={'12px'}
                padding={['5px', '10px', '10px', '10px', '15px']}
                width={['95%', '90%', '85%', '80%', '80%', '76%']}
                margin={'auto'}
            >
                 <Flex
                    letterSpacing={'0.1em'}
                    fontWeight={'600'}
                    fontSize={'32px'}
                    lineHeight={'40px'}
                    marginTop={'50px'}
                    marginBottom={'40px'}
                    justifyContent={'center'}
                    background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
                    color={'transparent'}
                    backgroundClip={'text'}
                >
                    Advanced text to AI image generator
                </Flex>

                <Flex
                    direction={['column', 'column', 'column', 'column', 'row']}
                    width={'100%'}
                >
                    <GeneratorResultContainer />
                    <GeneratorStyleContainer />
                </Flex>
            </Flex>
        </>
    )
}

export default ImageGenerator;