document.addEventListener('alpine:init', () => {
  Alpine.store('darkMode', {
    on: false,
  });

  Alpine.data('contract', () => ({
    address: '',
    title: 'myTitle',
    content: `
    //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
  string private greeting;

  event TestEvent(address from, string str);

  constructor(string memory _greeting) {
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public returns (string memory) {
    emit TestEvent(msg.sender, _greeting);
    greeting = _greeting;
    return greeting;
  }
}

    `,
    abi: [],
    bytecode: '',

    contractAddress: '',

    async getAddress() {
      const signer = await provider.getSigner();
      this.address = await signer.getAddress();
    },

    async compile() {
      const { data } = await axios.post(
        // 'http://localhost:3000/api/contract/compile',
        'https://contractcompile-neq2kr3vhq-de.a.run.app/api/contract/compile',
        {
          title: this.title,
          content: this.content,
        },
      );

      if (data.res == 'OK') {
        this.abi = data.abi;
        this.bytecode = data.bytecode;
      }
    },

    async deploy() {
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(this.abi, this.bytecode, signer);

      // input deploy args
      const contract = await factory.deploy('Greeting!');

      console.log(contract);
      this.contractAddress = contract.address;
    },
  }));

  Alpine.bind('SomeButton', () => ({
    type: 'button',

    ':class'() {
      return 'bg-blue-800 text-white px-2 py-1 rounded-xl';
    },

    '@click'() {
      console.log('BBBB');
    },
  }));
});
