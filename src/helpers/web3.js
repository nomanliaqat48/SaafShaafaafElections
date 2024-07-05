import Web3 from "web3";

// Get web3 instance
export const getWeb3 = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      return web3;
    } else {
      toast.error(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
  } catch (err) {
    toast.error(err?.message || err);
  }
};

export const connectWithMetamask = async () => {
  try {
    let web3 = await getWeb3();
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    let accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
    return;
  } catch (err) {
    toast.error(err?.message || err);
  }
};
