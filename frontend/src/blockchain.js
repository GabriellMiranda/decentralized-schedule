import { ethers } from "ethers";
import AgendaABI from "./AgendaABI.json"; // ABI do contrato compilado

const CONTRACT_ADDRESS = "0xSEU_CONTRATO";

export async function getContract() {
    if (!window.ethereum) throw new Error("Metamask não encontrada!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, AgendaABI, signer);
}
