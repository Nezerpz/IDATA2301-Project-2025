import {useEffect} from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = title + ' | Rental roulette';
  }, [title]);
}

export default useTitle;