import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useContract from './useContract';

import LuckyNumberABI from '../../src/contracts/LuckyNumber.json';

export const useLuckyAddress = () => {
  const { chainId } = useWeb3React();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (chainId) {
      setAddress(LuckyNumberABI.networks[chainId]?.address);
    }
  }, [chainId]);

  return {
    address,
  };
};
