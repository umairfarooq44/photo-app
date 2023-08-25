import {
  InputGroup,
  FormControl,
  Input,
  FormErrorMessage,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import axios from '@/utils/axios';
import { useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { MdSend } from 'react-icons/md';

interface FormValues {
  comment: String;
}

interface ICommentFieldProps {
  mutateComments: KeyedMutator<any>;
  imageId?: string;
}

const CommentField = (props: ICommentFieldProps) => {
  const { mutateComments, imageId } = props;
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const abc = await axios.post('/comment', {
        imageId,
        comment: data.comment
      });
      reset();
      await mutateComments();
    } catch (err) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <FormControl isInvalid={!!errors.comment?.message} my={6}>
          <Input
            {...register('comment', {
              required: 'Please enter the comment'
            })}
          />
          <InputRightElement>
            <Button type="submit" variant="link" color="teal.500">
              <MdSend />
            </Button>
          </InputRightElement>
          <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
        </FormControl>
      </InputGroup>
    </form>
  );
};
export default CommentField;
