import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddTask = () => {
  const [toDo, setToDo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
 
const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm();
 
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tasks');
        const tasks = res.data;
        setToDo(tasks.filter(task => task.status === 'todo'));
        setOngoing(tasks.filter(task => task.status === 'ongoing'));
        setCompleted(tasks.filter(task => task.status === 'completed'));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  useEffect(()=>{
    fetchData();
  })

 
  


  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (targetColumn) => {
    if (!draggedTask) return;

    try {
      // Update the status on the server
      await axios.put(`http://localhost:5000/updateStatus/${draggedTask._id}`, { status: targetColumn });
      
      // Fetch updated data from the server
      fetchData();
      
      setDraggedTask(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const onSubmit = async (data) => {
    const selectedDate = watch('Date');
    const selectedPriority = watch('Priority');

    const taskInfo = {
      title: data.Product_name,
      description: data.Description,
      deadline: selectedDate,
      priority: selectedPriority,
      status:"todo",
      // You might need to modify this based on your user context
      owner_email: 'example@example.com',
    };

    try {
      const res = await axios.post('http://localhost:5000/addtask', taskInfo);
      if (res.data.insertedId) {
       // Refresh task data after adding a new task
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

      <div className="grid grid-cols-3 gap-5">
        <div
          className="task-list w-80 border p-2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('todo')}
        >
          <h3 className="border-b mb-2 pb-2">To-Do</h3>
          {toDo.map((task) => (
            <div
              key={task._id}
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <p>{task.title}</p>
            </div>
          ))}
        </div>
        <div
          className="task-list w-80 border p-2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('ongoing')}
        >
          <h3 className="border-b mb-2 pb-2">Ongoing</h3>
          {ongoing.map((task) => (
            <div
              key={task._id}
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <p>{task.title}</p>
            </div>
          ))}
        </div>
        <div
          className="task-list w-80 border p-2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('completed')}
        >
          <h3 className="border-b mb-2 pb-2">Completed</h3>
          {completed.map((task) => (
            <div key={task._id}>
              <p>{task.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
