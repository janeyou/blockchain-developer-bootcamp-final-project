import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import Button from 'react-bootstrap/Button';
import Text from '../../components/Text';
import { Container } from '../../styles/Style';
import { colors } from '../../theme';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../hooks/useContract';
import { useLuckyAddress } from '../../hooks/useLuckyAddress';
import LuckyNumberABI from '../../../build/contracts/LuckyNumber.json';

const LuckyNumberCard = () => {
  const { active } = useWeb3React();

  const [luckyNumber, setLuckyNumber] = useState(0);
  const contract = useContract('0x07F92af05515c3f13561778da6FCDE4e3984801c', LuckyNumberABI.abi);

  useEffect(() => {
    const getLuckNumber = async () => {
      const number = await contract.getMyNumber();
      setLuckyNumber(number);
    };
    getLuckNumber();
  }, []);

  const onGetLucky = async () => {
    const min = 1000;
    const max = 9999;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(num);
    try {
      const transaction = await contract.setMyNumber(num);
      setLuckyNumber(num);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container show>
      <Card
        style={{ maxWidth: 420, minHeight: 400, borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text block t2 color={colors.black} className="mb-3">
          {!active ? 'Connect Wallet First' : luckyNumber === 0 ? '' : 'Your Lucky Number'}
        </Text>
        {active && (
          <Text style={{ fontSize: 80 }} color={luckyNumber === 0 ? colors.brown : colors.purple}>
            {luckyNumber}
          </Text>
        )}
        <Button
          style={{ height: 80, borderRadius: 40, fontSize: 26 }}
          variant="outline-dark"
          disabled={!active}
          className="mt-3"
          onClick={() => onGetLucky()}
        >
          {luckyNumber > 999 ? '👆🏼 Get more lucky 👆🏼' : '👆🏼 Get lucky number 👆🏼'}
        </Button>
        {!active && (
          <Text block t3 color={colors.gray} className="mb-3" style={{ textAlign: 'center', marginTop: '30px' }}>
            A Simple Dapp to get and store your lucky numbers on Ropsten!'
          </Text>
        )}
      </Card>
    </Container>
  );
};

export default LuckyNumberCard;
