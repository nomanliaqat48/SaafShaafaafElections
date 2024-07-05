import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/web3Context';

const ChairPersonDetails = () => {
  const { contract } = useContext(Web3Context);
  const [chairperson, setChairperson] = useState("");

  useEffect(() => {
    const fetchChairperson = async () => {
      if (contract) {
        const chairpersonAddress = await contract.methods.chairperson().call();
        setChairperson(chairpersonAddress);
      }
    };
    fetchChairperson();
  }, [contract]);

  return (
    <div className='mt-5'>
      <h2>Chairperson</h2>
      <p>{chairperson}</p>
    </div>
  );
};

export default ChairPersonDetails;
