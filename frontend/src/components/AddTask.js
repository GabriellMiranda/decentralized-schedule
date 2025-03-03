import { useState } from "react";
import { getContract } from "../blockchain";

const AddTask = () => {
    const [description, setDescription] = useState("");
    const [timestamp, setTimestamp] = useState("");

    const addTask = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.addTask(description, timestamp);
            await tx.wait();
            alert("Tarefa adicionada!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Adicionar Compromisso</h2>
            <input type="text" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
            <input type="datetime-local" onChange={(e) => setTimestamp(Math.floor(new Date(e.target.value).getTime() / 1000))} />
            <button onClick={addTask}>Adicionar</button>
        </div>
    );
};

export default AddTask;
