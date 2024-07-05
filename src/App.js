// src/App.js
import React, { useContext, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Web3Context } from "./context/web3Context";
import Button from "react-bootstrap/Button";
import ChairPersonDetails from "./components/chairPersonDetails";
import CastVote from "./components/castVote";
import VoteDetails from "./components/voteDetails";
import Admin from "./components/admin";
import "./App.css";

const App = () => {
  const { web3, account, connectWallet, error } = useContext(Web3Context);
  const [selectedTab, setSelectedTab] = useState("cast_vote");

  return (
    <div className="App">
      <header className="App-header">
        <h1>{account ? "" : "Web3 Project"}</h1>
        {error && <p className="error">{error}</p>}
        {web3 && account ? (
          <>
            <Tabs
              className="mb-3"
              activeKey={selectedTab}
              onSelect={(tab) => setSelectedTab(tab)}
            >
              <Tab eventKey="cast_vote" title="Cast Vote">
                <CastVote />
              </Tab>
              <Tab eventKey="vote_details" title="Vote Details">
                <VoteDetails />
              </Tab>
              <Tab
                eventKey="chairman_person_details"
                title="ChairPerson Details"
              >
                <ChairPersonDetails />
              </Tab>
              <Tab eventKey="admin" title="Admin Panel" >
                <Admin />
              </Tab>
            </Tabs>
          </>
        ) : (
          <Button variant="primary" onClick={connectWallet}>
            Connect MetaMask
          </Button>
        )}
      </header>
    </div>
  );
};

export default App;
