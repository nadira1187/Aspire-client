import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import Task from './Task';

const AddTask = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [toDo, setToDo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  const onTaskDrop = (task, targetColumn) => {
    // Update state accordingly
    switch (targetColumn) {
      case 'todo':
        // Task is already in the 'To-Do' column, no need to update
        break;
      case 'ongoing':
        setOngoing([...ongoing, task]);
        setToDo(toDo.filter((t) => t._id !== task._id));
        break;
      case 'completed':
        setCompleted([...completed, task]);
        setOngoing(ongoing.filter((t) => t._id !== task._id));
        break;
      default:
        break;
    }
  
    console.log(`Task dropped to '${targetColumn}' column:`, task);
  };
  
  

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setToDo(res.data);
    } catch (error) {
      console.error('Error fetching ToDo tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  const onSubmit = async (data) => {
    const selectedDate = watch('Date');
    const selectedPriority = watch('Priority');

    const taskInfo = {
      title: data.Product_name,
      description: data.Description,
      deadline: selectedDate,
      priority: selectedPriority,
      owner_email: user?.email,
    };
    
    try {
      const res = await axios.post('http://localhost:5000/addtask', taskInfo);
      if (res.data.insertedId) {
        fetchData(); // Refresh task data after adding a new task
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.Product_name} is added to the collection.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="mt-5 ml-3 flex flex-col justify-center items-center">
      <h2 className="text-4xl lg:text-6xl text-blue-900 text-center font-bold mb-8">Add your Task</h2>
      <form className="form form-control gap-3 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
  <div className="flex flex-col lg:flex-row gap-3">
    <input
      className="input input-bordered input-info w-full max-w-xs"
      placeholder="Task Name"
      {...register('Product_name', { required: true })}
    />
    <input
      type="date"
      className="input input-bordered input-info w-full max-w-xs"
      placeholder="Deadline"
      {...register('Date', { required: true })}
    />
    <select
      className="select select-bordered select-info w-full max-w-xs"
      placeholder="Priority"
      {...register('Priority', { required: true })}
    >
      <option value="low">Low</option>
      <option value="moderate">Moderate</option>
      <option value="high">High</option>
    </select>
  </div>
  <textarea
    placeholder="Product Description"
    className="textarea textarea-info  max-w-xs w-96"
    {...register('Description', { required: true })}
  />
  <button className="btn btn-primary bg-blue-900 text-white" type="submit">
    Submit
  </button>
  {errors.exampleRequired && <span>This field is required</span>}
</form>

      <div className="flex flex-row gap-5">
        <div className="task-list flex flex-col">
          <h3>To-Do</h3>
          {toDo.map((task) => (
            <Task key={task._id} task={task} onTaskDrop={(draggedTask, targetColumn) => onTaskDrop(draggedTask, targetColumn)} />
          ))}
        </div>
        <div className="task-list flex flex-col">
          <h3>Ongoing</h3>
          {ongoing.map((task) => (
            <Task key={task._id} task={task} onTaskDrop={(draggedTask, targetColumn) => onTaskDrop(draggedTask, targetColumn)} />
          ))}
        </div>
        <div className="task-list flex flex-col">
          <h3>Completed</h3>
          {completed.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
