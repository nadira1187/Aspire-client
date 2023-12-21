import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const AddTask = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // Assuming "Date" is a field in your form
    const selectedDate = watch('Date');

    // Assuming "Priority" is a field in your form
    const selectedPriority = watch('Priority');

    const taskInfo = {
      title: data.Product_name, // Product_name as title
      description: data.Description,
      deadline: selectedDate, // Use the selected date
      priority: selectedPriority, // Use the selected priority
      owner_email: user?.email,
    };

    console.log(taskInfo);

    try {
      // Replace 'your-api-endpoint' with your actual API endpoint
      const res = await axios.post('http://localhost:5000/addtask', taskInfo);
      console.log(res.data);

      if (res.data.insertedId) {
        // Show success popup
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.Product_name} is added to the collection.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle error
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="mt-5 ml-3 flex flex-col justify-center items-center">      {/* Your existing code for displaying user info */}
      <h2 className="text-4xl lg:text-6xl text-blue-900 text-center font-bold mb-8">Add your Task</h2>
      <form className="form form-control gap-3 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            className="input input-bordered input-info w-full max-w-xs"
            placeholder="Product Name"
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
        {/* Your existing code for additional input fields */}
        <button className="btn btn-primary bg-blue-900 text-white">Submit</button>
        {errors.exampleRequired && <span>This field is required</span>}
      </form>
    </div>
  );
};

export default AddTask;
