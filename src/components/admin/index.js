import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../../context/web3Context";
import { Form, Button } from "react-bootstrap";

const Admin = () => {
  const { contract, account } = useContext(Web3Context);
  const [voterAddress, setVoterAddress] = useState("");
  const [chairperson, setChairperson] = useState("");

  const handleWhitelist = async () => {
    if (contract && voterAddress && account !== chairperson) {
      await contract.methods
        .giveRightToVote(voterAddress)
        .send({ from: account });
      alert("Voter whitelisted successfully!");
    }
  };

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
    <div>
      {account === chairperson ? (
        <>
          <h2>Admin Section</h2>
          <Form>
            <Form.Group>
              <Form.Label>Voter Address</Form.Label>
              <Form.Control
                type="text"
                value={voterAddress}
                onChange={(e) => setVoterAddress(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={handleWhitelist}
              disabled={account !== chairperson}
              className="mt-3"
            >
              Whitelist Voter
            </Button>
          </Form>
        </>
      ) : (
        <h2 className="mt-5">Only admin can access this section!</h2>
      )}
    </div>
  );
};

export default Admin;
