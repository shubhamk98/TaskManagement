import { useContext, useEffect, useState } from "react";
import Task from "../Components/Task";
import { AuthContext } from "../context/auth";
import makeApiCall from "../Api/api";

const apiUrl = import.meta.env.VITE_AWS_API_URL || "";

const Main = () => {
  const [task, setTask] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const { responseData } = useContext(AuthContext);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    const apiCall = async () => {
      try {
        const url = `${apiUrl}?userId=${responseData.userId}`;

        const response = await fetch(url);

        const taskData = await response.json();

        const finalData = Array.isArray(taskData) ? taskData : [];

        setAllTodo(finalData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    apiCall();
  }, [responseData.userId]);

  const handleTask = async () => {
    if (task=== "") {
      return;
    }
    const newTask = { task: task, taskStatus: "not-started" };

    // Update the state after successful API call
    setAllTodo([...allTodo, newTask]);
    setTask("");
  };
  return (
    <div className="flex flex-col mx-16">
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900 pt-8"
        >
          Enter your Task 👇🏻
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="price"
            id="price"
            value={task}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 pl-6 pr-20 text-gray-900 ring-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-pink-500 sm:text-sm"
            placeholder="This is my 1st task"
          />

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="px-6 py-2 bg-pink-500 hover:bg-pink-400 rounded-md font-medium text-white"
              onClick={handleTask}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {allTodo.map((item, i) => (
          <Task
            key={i}
            id={i}
            data={item.task}
            status={item.taskStatus}
            setStatus={(newStatus) => {
              const updatedTasks = [...allTodo];
              updatedTasks[i].taskStatus = newStatus;
              setAllTodo(updatedTasks);
            }}
            onEdit={(taskId, editedTask) => {
              const updatedTasks = [...allTodo];
              updatedTasks[taskId].task = editedTask;
              setAllTodo(updatedTasks);
            }}
            onDelete={(taskId) => {
              const updatedTasks = allTodo.filter(
                (_, index) => index !== taskId
              );
              setAllTodo(updatedTasks);

              // Update the API only after updating the state
              const taskToDelete = allTodo[taskId];
              if (taskToDelete) {
                makeApiCall("DELETE", {
                  userId: responseData.userId,
                  ...taskToDelete,
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
