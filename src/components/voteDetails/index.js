import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../../context/web3Context";
import { Tabs, Tab } from "react-bootstrap";

const VoteDetails = () => {
  const { web3, contract } = useContext(Web3Context);
  const [proposal, setProposal] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const fetchProposal = async (proposalId) => {
    if (contract) {
      const proposal = await contract.methods.proposals(proposalId).call();
      setProposal(proposal);
    }
  };
  useEffect(() => {
    fetchProposal(selectedTab);
  }, [contract]);
  const leaderNames = [
    {
      id: "Proposal1",
      name: "Imran Khan",
    },
    {
      id: "Proposal2",
      name: "Nawaz Shareef",
    },
    {
      id: "Proposal3",
      name: "Bilawal Bhutto",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="mb-4">Vote Details</h2>
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => {
          setSelectedTab(tab);
          fetchProposal(tab);
        }}
       
      >
        {leaderNames.map((leader, index) => (
          <Tab eventKey={index} title={leader.name} key={index}>
            <p  className="mt-4">Name: {leader.name}</p>
            <p>Vote Count: {parseInt(proposal.voteCount)}</p>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default VoteDetails;
