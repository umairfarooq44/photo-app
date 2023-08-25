import {
  Container,
  Image,
  Flex,
  Button,
  Box,
  useDisclosure
} from '@chakra-ui/react';
import { useInfiniteImages } from './hooks';
import FileUpload from './FileUpload';
import ImageInfo from '../ImageInfo';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;

interface ISelectedImage {
  imageUrl?: string;
  id?: string;
}

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<ISelectedImage>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    mutate
  } = useInfiniteImages({
    itemsPerPage: ITEMS_PER_PAGE
  });

  const onLoadMore = () => {
    setSize(size + 1);
  };

  const openImageModal = (imageUrl: string, id: string) => () => {
    onOpen();
    setSelectedImage({ imageUrl, id });
  };

  return (
    <Container mt="16" maxW="container.xl">
      <FileUpload mutateImages={mutate} />
      <Box
        padding={14}
        w="100%"
        maxW="900px"
        mx="auto"
        sx={{ columnCount: [1, 2, 3], columnGap: '2rem' }}
      >
        {data.map(({ imageUrl, _id }) => (
          <Image
            boxShadow="md"
            borderRadius="8px"
            transform="scale(1)"
            transition=".3s ease-in-out"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            cursor="pointer"
            mb={4}
            src={imageUrl}
            key={_id}
            onClick={openImageModal(imageUrl, _id)}
          />
        ))}
      </Box>
      {!isReachingEnd && (
        <Flex justifyContent="center">
          <Button
            disabled={isLoadingMore}
            isLoading={isLoadingMore}
            loadingText="Loading Images"
            onClick={onLoadMore}
            mb="8"
            variant="link"
          >
            Show more Images
          </Button>
        </Flex>
      )}
      <ImageInfo
        isOpen={isOpen}
        onClose={onClose}
        imageId={selectedImage?.id}
        imageUrl={selectedImage?.imageUrl}
      />
    </Container>
  );
};

export default Home;
