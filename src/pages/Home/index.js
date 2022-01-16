import React from 'react';
import { Container } from 'react-bootstrap';
import LuckyNumberCard from './LuckyNumberCard';
import ConnectWalletModal from '../../components/ConnectWalletModal';
import useWalletConnectionModal from '../../hooks/useWalletConnectionModal';

const Home = () => {
  const { isWalletConnectModalOpen } = useWalletConnectionModal();
  return (
    <Container className="mt-5">
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      <LuckyNumberCard />
    </Container>
  );
};

export default Home;
