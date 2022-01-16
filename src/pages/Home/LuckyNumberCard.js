import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import Button from 'react-bootstrap/Button';
import Text from '../../components/Text';
import { Container, Group } from '../../styles/Style';
import { colors } from '../../theme';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../hooks/useContract';
import { useLuckyAddress } from '../../hooks/useLuckyAddress';
import LuckyNumberABI from '../../../src/contracts/LuckyNumber.json';

const LuckyNumberCard = () => {
  const { active } = useWeb3React();

  const [luckyNumber, setLuckyNumber] = useState(0);
  const [workout, setWorkout] = useState([]);
  const contract = useContract('0x07F92af05515c3f13561778da6FCDE4e3984801c', LuckyNumberABI.abi);

  useEffect(() => {
    const getLuckNumber = async () => {
      const number = await contract.getMyNumber();
      setLuckyNumber(number);
      setWorkout(num.toString().split('').map(Number));
    };
    getLuckNumber();
  }, []);

  const onGetLucky = async () => {
    const min = 100000;
    const max = 999999;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(num);
    try {
      const transaction = await contract.setMyNumber(num);
      setLuckyNumber(num);
      setWorkout(num.toString().split('').map(Number));
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(workout);

  return (
    <Container show>
      <Card
        style={{
          maxWidth: 420,
          minHeight: 400,
          borderRadius: 200,
          paddingTop: 60,
          paddingBottom: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text block t2 color={colors.black} className="mb-3">
          {!active ? 'Connect Wallet First' : luckyNumber === 0 ? '' : 'Your Running This Week'}
        </Text>
        {active && luckyNumber > 0 && (
          <Text style={{ fontSize: 16, marginBottom: 20 }} color={luckyNumber === 0 ? colors.brown : colors.black}>
            {'Code:' + luckyNumber}
          </Text>
        )}
        {luckyNumber > 0 && (
          <Group>
            {workout.map((e, index) => (
              <Text
                key={index}
                block
                t3
                color={colors.gray}
                className="mb-3"
                style={{ textAlign: 'left', marginTop: '0px' }}
              >
                Day {index + 1}: {e === 0 ? 'rest day' : e + ' mile'}
              </Text>
            ))}
            <Text block t3 color={colors.gray} className="mb-3" style={{ textAlign: 'left', marginTop: '0px' }}>
              Day 7: rest day
            </Text>
          </Group>
        )}
        <Button
          style={{ height: 80, borderRadius: 40, fontSize: 26 }}
          variant="outline-dark"
          disabled={!active}
          className="mt-3"
          onClick={() => onGetLucky()}
        >
          {'Get marathon training'}
        </Button>
      </Card>
    </Container>
  );
};

export default LuckyNumberCard;
