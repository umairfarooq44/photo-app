import useSWRInfinite from 'swr/infinite';
import qs from 'querystring';

interface ImagesData {
  itemsPerPage: number;
}
interface IImageList {
  imageUrl: string;
  _id: string;
}

export const useInfiniteImages = (imagesData: ImagesData) => {
  const { itemsPerPage } = imagesData;
  const getKey = (pageIndex: number) => {
    return [
      `/images?${qs.stringify({
        offset: pageIndex * itemsPerPage,
        limit: itemsPerPage
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
      : []) as IImageList[],
    error,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    setSize,
    size
  };
};
