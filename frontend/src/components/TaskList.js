import { useEffect, useState } from "react";
import { getContract } from "../blockchain";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const contract = await getContract();
            const nextId = await contract.nextId();
            let taskList = [];

            for (let i = 0; i < nextId; i++) {
                const task = await contract.getTask(i);
                if (task.description) {
                    taskList.push(task);
                }
            }

            setTasks(taskList);
        }

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Compromissos</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task.description} - {new Date(task.timestamp * 1000).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
