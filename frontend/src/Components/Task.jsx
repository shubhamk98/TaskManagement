import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/auth";
import makeApiCall from "../Api/api";

const Task = ({ id, data, status, setStatus, onEdit, onDelete }) => {
  const { responseData } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(data);

  const [allData, setAllData] = useState({
    userId: responseData.userId,
    taskId: id,
    task: data,
    taskStatus: status,
  });

  useEffect(() => {
    // Make the POST call when the component mounts
    apiCall("POST", allData);
  }, []);
  const apiCall = async (method, data) => {
    try {
      await makeApiCall(method, data);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleDropdownChange = (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false);

    // Update allData before making the PATCH API call
    setAllData((prevData) => ({ ...prevData, taskStatus: newStatus }));

    // Move the apiCall inside the setAllData callback
    setAllData((prevData) => {
      apiCall("PATCH", { ...prevData, taskStatus: newStatus });
      return { ...prevData, taskStatus: newStatus };
    });
  };

  const getColorClass = () => {
    switch (status) {
      case "not-started":
        return "bg-red-500";
      case "on-going":
        return "bg-yellow-400";
      case "done":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleEditSave = () => {
    onEdit(id, editedTask);
    setIsEditing(false);

    // Update allData before making the PATCH API call
    setAllData((prevData) => ({ ...prevData, task: editedTask }));

    // Move the apiCall inside the setAllData callback
    setAllData((prevData) => {
      apiCall("PATCH", { ...prevData, task: editedTask });
      return { ...prevData, task: editedTask };
    });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="pl-4 py-3 my-2 pr-5 rounded-md font-medium focus:outline-none border border-pink-200  w-full overflow-ellipsis overflow-hidden"
        />
      ) : (
        <p
          className={`pl-4 py-3 my-2 pr-32 rounded-md font-medium w-full overflow-ellipsis overflow-hidden ${getColorClass()}`}
        >
          {data}
        </p>
      )}
      {isEditing ? (
        <button
          className="bg-pink-200 px-6 py-3 rounded-md ml-2"
          onClick={handleEditSave}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-pink-200 px-6 py-3 rounded-md ml-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-pink-200 px-6 py-3 rounded-md ml-2"
      >
        Status
      </button>
      <button
        onClick={handleDelete}
        className="px-6 py-3 font-bold rounded-md ml-2 bg-gray-300 text-black"
      >
        X
      </button>
      {isDropdownOpen && (
        <div className="relative ml-2">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ></button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-red-200"
              onClick={() => handleDropdownChange("not-started")}
            >
              Not Started
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-200"
              onClick={() => handleDropdownChange("on-going")}
            >
              On Going
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-green-200"
              onClick={() => handleDropdownChange("done")}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
