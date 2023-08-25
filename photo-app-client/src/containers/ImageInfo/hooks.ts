import useSWRInfinite from 'swr/infinite';
import qs from 'querystring';

interface CommentsData {
  itemsPerPage: number;
  imageId?: string;
}

interface ICommentList {
  comment: string;
  _id: string;
}

export const useInfiniteComments = (commentsData: CommentsData) => {
  const { itemsPerPage, imageId } = commentsData;
  const getKey = (pageIndex: number) => {
    if (!imageId) return null;
    return [
      `http://localhost:4000/comment/list?${qs.stringify({
        offset: pageIndex * itemsPerPage,
        limit: itemsPerPage,
        imageId
      })}`
    ];
  };

  const { data, error, size, setSize, ...rest } = useSWRInfinite(getKey);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined') ||
    false;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.data?.length < itemsPerPage) ||
    false;

  return {
    ...rest,
    data: (data
      ? data.reduce((acc, curr: any) => [...acc, ...curr.data], [])
      : []) as ICommentList[],
    total: data ? data[0]?.total : 0,
    error,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    setSize,
    size
  };
};
