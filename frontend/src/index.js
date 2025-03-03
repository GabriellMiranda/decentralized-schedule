// Configuração da Conexão com a Blockchain e Interação com o Contrato
const { ethers } = window;

const CONTRACT_ADDRESS = "0xSEU_CONTRATO";  // Substitua com o endereço do seu contrato
const ABI = [
    // ABI do seu contrato (exemplo, será gerada no momento do deploy)
    {
        "inputs": [
            { "internalType": "string", "name": "_description", "type": "string" },
            { "internalType": "uint256", "name": "_timestamp", "type": "uint256" }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextId",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
        "name": "getTask",
        "outputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Conectar com o Metamask
async function connectToMetamask() {
    if (!window.ethereum) {
        alert("MetaMask não detectado!");
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    return contract;
}

// Adicionar Tarefa ao Smart Contract
document.getElementById('addTaskButton').onclick = async function() {
    const description = document.getElementById('description').value;
    const timestamp = Math.floor(new Date(document.getElementById('timestamp').value).getTime() / 1000);
    
    if (!description || !timestamp) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const contract = await connectToMetamask();
        const tx = await contract.addTask(description, timestamp);
        await tx.wait();
        alert("Tarefa adicionada!");
        loadTasks(); // Recarregar a lista de tarefas
    } catch (err) {
        console.error(err);
        alert("Erro ao adicionar tarefa");
    }
};

// Carregar a lista de tarefas do Smart Contract
async function loadTasks() {
    try {
        const contract = await connectToMetamask();
        const taskCount = await contract.nextId();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        for (let i = 0; i < taskCount; i++) {
            const task = await contract.getTask(i);
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.description} - ${new Date(task.timestamp * 1000).toLocaleString()}`;
            taskList.appendChild(taskItem);
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar tarefas");
    }
}

// Carregar as tarefas na inicialização
loadTasks();
