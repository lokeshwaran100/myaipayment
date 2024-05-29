import {
  Flex,
  Image,
  Button,
  AspectRatio,
  Input,
  Box,
} from '@chakra-ui/react';
import { GeneratorPresetTextData, GeneratorStyleData } from "../../../utils/constants";
import { useDappContext } from '../../../utils/Context'
import { sleep } from '../../../utils/interface';

const GeneratorResultContainer = () => {
  const {
    styleId, setStyleId,
    shapeId, setShapeId,
    styleText, setStyleText,
    prediction,
  } = useDappContext();

  const addStyleText = (index: number) => {
    let tempStyleText = styleText;
    if (styleText != "") tempStyleText += " ";
    tempStyleText += GeneratorPresetTextData[index].text + " ";
    setStyleText(tempStyleText);
  }

  // const getResultImageSize = (shapeId: number) => {
  //   let resultImageSize = { width: '', ratio: 1 };
  //   let ratio = 1;
  //   if (shapeId != -1) {
  //     ratio = GeneratorShapeData[shapeId].width / GeneratorShapeData[shapeId].height;
  //   }

  //   if (ratio >= 1)
  //     resultImageSize.width = '100%';
  //   else
  //     resultImageSize.width = 100 * ratio + '%';

  //   resultImageSize.ratio = ratio;
  //   return resultImageSize;
  // }
  const imageDownload = async () => {
    //@ts-ignore*
    const imageSrc = prediction.output[prediction.output.length - 1];
    let params = { imageSrc: imageSrc };
    fetch('/api/image_fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.blob())
      .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        const element = document.createElement("a");
        element.href = imageUrl;
        element.download = "MyAI_Image";
        element.click();
      })
      .catch(error => {
        console.error(error);
      });

  }
  return (

    <Flex
      direction='column'
      // alignItems='center'
      width={['100%', '100%', '85%', '75%', '41%']}

      padding={['10px', '10px', '10px', '10px', '15px']}
    >
      <Flex
        direction='column'
      >
        <Flex
          marginTop={'25px'}
          marginBottom={'15px'}
        >
          <Flex
            fontSize={'18px'}
            textAlign={'left'}
            background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
            marginBottom={'10px'}
            letterSpacing={'0.1em'}
            fontWeight={'600'}
            backgroundClip={'text'}
            color={'transparent'}
          >
            Type your text.
          </Flex>
        </Flex>

        <Flex>
          {/* <Input variant='outline' width={'calc(100% - 90px)'} value={styleText}
                        onChange={e => { setStyleText(e.currentTarget.value); }}
                    /> */}
          <Input
            type="text"
            name="name"
            placeholder="Prompt Text"
            color={'#262A37'}
            width={'calc(100% - 100px)'}
            value={styleText}
            border={'1px solid #eeeeee !important'}
            boxShadow={'unset !important'}
            onChange={e => { setStyleText(e.currentTarget.value); }}
            required
            _focus={{
              border: '1px solid #ED2775 !important',
            }}
          />
          <Button
            marginLeft={'10px'}
            width={'90px'}
            onClick={() => setStyleText("")}
            background={'#E53E3E'}
            color={'white'}
            _hover={{
              background: '#262A37'
            }}
            _active={{
              background: '#262A37'
            }}
          >
            Clear
          </Button>
        </Flex>

      </Flex>
      <Flex
        direction='column'
      >
        <Flex
          marginTop={'25px'}
          marginBottom={'15px'}
        >
          <Flex
            fontSize={'18px'}
            textAlign={'left'}
            background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
            marginBottom={'10px'}
            letterSpacing={'0.1em'}
            fontWeight={'600'}
            backgroundClip={'text'}
            color={'transparent'}
          >
            Or use sample words below
          </Flex>
        </Flex>

        <Flex
          flexWrap={'wrap'}
        >
          {
            GeneratorPresetTextData.map((item, index) => (
              <Button
                key={index}
                width={'100px'}
                margin={'5px'}
                color={'white'}
                onClick={() => addStyleText(index)}
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
                {item.text}
              </Button>
            ))
          }
        </Flex>
      </Flex>

      <Flex
        direction='column'
        alignItems='center'
        width={['100%', '100%', '100%', '100%', '100%']}
        // height={['100%', '100%', '100%', '100%', '100%']}
        marginTop={'30px'}
        border={'1.5px solid #A0AEC0'}
        borderRadius={'12px'}
        padding={'10px'}
      >

        {/* <Box
          paddingTop={'5px'}
          paddingBottom={'5px'}
          width={'100%'}
        >
          {
            //@ts-ignore*
            (prediction.status === "processing" || prediction.status === "starting") ? (<Progress size='xs' isIndeterminate />) : (<></>)
          }
        </Box> */}
        {/* @ts-ignore */}
        <AspectRatio
          // width={getResultImageSize(shapeId).width}
          // ratio={getResultImageSize(shapeId).ratio}
          width={'100%'}
          ratio={1}

        >
          {
            //@ts-ignore*
            (prediction.status === "processing" || prediction.status === "starting") ?
              (

                <Flex
                >
                  <Flex
                    fontSize={'24px'}
                    textAlign={'left'}
                    background={'linear-gradient(44.44deg, #ED2775 7.79%, #FF7448 94.18%)'}
                    animation={'blinking 1s linear infinite'}
                    letterSpacing={'0.1em'}
                    fontWeight={'700'}
                    backgroundClip={'text'}
                    color={'transparent'}
                  >
                    Generating...
                  </Flex>
                </Flex>
              ) :
              (<Image
                borderRadius={'10px'}
                //@ts-ignore*
                src={prediction && prediction.output ? prediction.output[prediction.output.length - 1] : GeneratorStyleData[styleId].src} />)
          }
        </AspectRatio>
      </Flex>
      <Flex
        direction='column'
        alignItems={'center'}
        mt={'20px'}
      >
        {/*@ts-ignore*/}
        {prediction && prediction.output ? (
          <button
            className={'default-btn'}
            onClick={imageDownload}
          >
            Download
          </button>
        ) :
          (<></>)
        }
      </Flex>
    </Flex>
  )
}

export default GeneratorResultContainer;