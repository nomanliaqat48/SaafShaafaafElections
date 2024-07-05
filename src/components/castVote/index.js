import React, { useContext, useState } from "react";
import { Web3Context } from "../../context/web3Context";
import { Form, Button } from "react-bootstrap";

const CastVote = () => {
  const { contract, account } = useContext(Web3Context);
  const [vote, setVote] = useState(null);

  const handleVoteCast = async () => {
    if (contract && vote !== null) {
      await contract.methods.vote(vote).send({ from: account });
      alert("Vote casted successfully!");
    }
  };

  return (
    <div className="mt-5">
      <h1 className="mb-3">Cast Vote</h1>
      <Form>
        <Form.Check
          type="radio"
          label="Imran Khan"
          name="vote"
          value={0}
          checked={vote === 0}
          onChange={() => setVote(0)}
        />
        <Form.Check
          type="radio"
          label="Nawaz Shareef"
          name="vote"
          value={1}
          checked={vote === 1}
          onChange={() => setVote(1)}
        />
        <Form.Check
          type="radio"
          label="Bilawal Bhutto"
          name="vote"
          value={2}
          checked={vote === 2}
          onChange={() => setVote(2)}
        />
        <Button onClick={handleVoteCast} className="mt-3">
          Submit Vote
        </Button>
      </Form>
    </div>
  );
};

export default CastVote;
