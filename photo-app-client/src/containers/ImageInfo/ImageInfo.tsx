import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  CircularProgress,
  Text,
  Flex,
  Button,
  Image,
  Box
} from '@chakra-ui/react';
import { useInfiniteComments } from './hooks';
import CommentField from './CommentField';

interface ImageInfoProps {
  isOpen: boolean;
  onClose: () => void;
  imageId?: string;
  imageUrl?: string;
}

const ITEMS_PER_PAGE = 5;
const ImageInfo = (props: ImageInfoProps) => {
  const { isOpen, onClose, imageUrl, imageId } = props;
  const {
    data,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    total,
    mutate
  } = useInfiniteComments({
    itemsPerPage: ITEMS_PER_PAGE,
    imageId
  });

  const onLoadMore = () => {
    setSize(size + 1);
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex justifyContent="center">
            <Image src={imageUrl} maxH="64" borderRadius="md" boxShadow="md" />
          </Flex>
          <Box mt="4">
            {isLoading ? (
              <Flex justifyContent="center">
                <CircularProgress my="4" isIndeterminate color="teal.300" />
              </Flex>
            ) : (
              <Text color="gray.500">{total} Comment(s)</Text>
            )}
            <CommentField imageId={imageId} mutateComments={mutate} />
            {data.length === 0 && !isLoading && (
              <Text fontSize="sm" color="gray.500" textAlign="center">
                No Comments available.
              </Text>
            )}
            {data.map(({ comment, _id }) => (
              <Text
                mb="4"
                key={_id}
                bg="teal.50"
                border="1px"
                borderColor="teal.400"
                borderRadius="2xl"
                padding="2"
                pl="4"
              >
                {comment}
              </Text>
            ))}
            {!isReachingEnd && (
              <Flex justifyContent="center">
                <Button
                  disabled={isLoadingMore}
                  isLoading={isLoadingMore}
                  loadingText="Loading Images"
                  onClick={onLoadMore}
                  variant="link"
                >
                  Load more
                </Button>
              </Flex>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ImageInfo;
