# decentralized-schedule

# 1. Instalar o Node.js e npm
Se ainda não tem o Node.js instalado, baixe e instale a versão mais recente do site oficial:
🔗 Node.js Download

Após a instalação, verifique se está tudo certo:

node -v
npm -v

# 2 - Inicializar um projeto Node.js

npm init -y

# 3 - Instalar o Hardhat

npm install --save-dev hardhat

Após a intalação, execute:

npx hardhat

# 4 -  Estrutura do projeto

meu-projeto-hardhat/
│── contracts/       # Onde ficam os contratos Solidity
│   └── Lock.sol     # Exemplo de contrato inicial
│── scripts/         # Scripts para implantação
│   └── deploy.js    # Script para deploy do contrato
│── test/            # Testes dos contratos
│   └── sample-test.js
│── hardhat.config.js # Configuração do Hardhat
│── package.json      # Dependências do projeto


# 5 - Compilar o contrato

npx hardhat compile

# 6 - Rodar um no local e fazer o deploy
Abra um terminal e inicie um nó local do Hardhat:
    npx hardhat node

Em outro terminal, faça o deploy:
   npx hardhat ignition deploy ignition/modules/Lock.js --network localhost

# 7 - Execute os testes:

npx hardhat test