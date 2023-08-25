import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast
} from '@chakra-ui/react';
import { KeyedMutator } from 'swr';
import axios from '@/utils/axios';
import { isAxiosError } from 'axios';

interface FormValues {
  image: File[];
}

interface IFileUploadProps {
  mutateImages: KeyedMutator<any>;
}
const FileUpload = (props: IFileUploadProps) => {
  const { mutateImages } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', data.image[0]);
      const abc = await axios.post('/images/upload', formData);
      await mutateImages();
      onClose();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (isAxiosError(err)) {
        toast({
          title: 'Error',
          description: err.response?.data?.errors?.[0] || err.message,
          status: 'error',
          isClosable: true,
          position: 'top'
        });
      }
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Button
          size="lg"
          width="md"
          colorScheme="teal"
          px="16"
          onClick={onOpen}
        >
          Upload Image
        </Button>
      </Flex>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody py={6}>
              <Input
                border="none"
                accept="image/*"
                type="file"
                {...register('image', {
                  required: 'Image is required'
                })}
              />
              <FormControl isInvalid={!!errors.image?.message}>
                <FormErrorMessage ml="4">
                  {errors.image?.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={isLoading}
                loadingText="Saving..."
                colorScheme="teal"
                mr={3}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default FileUpload;
