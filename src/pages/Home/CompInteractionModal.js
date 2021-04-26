import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../components/Text';
import BalanceInput from '../../components/BalanceInput';
import Button from 'react-bootstrap/Button';
import { colors } from '../../theme';

const ModalSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;

  .card {
    background-color: ${colors.lightBlue};
    position: relative;
    max-width: 420px;
    width: 100%;
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px,
      rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 15px;
    border-color: ${colors.green};
    padding: 20px;
  }
`;

const CompInteractionModal = () => {
  const [ethBalance, setEthBalance] = useState(10);
  const [cEthBalance, setCEthBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  return (
    <ModalSkeleton show>
      <div className="card">
        <Text block t2 color={colors.green} className="mb-3">
          Deposit
        </Text>
        <BalanceInput balance={ethBalance} value={depositAmount} setValue={setDepositAmount} />
        <BalanceInput balance={ethBalance} value={convertedAmount} />
        <Button variant="outline-dark" disabled={depositAmount <= 0}>Deposit {depositAmount} ETH</Button>
      </div>
    </ModalSkeleton>
  );
};

export default CompInteractionModal;