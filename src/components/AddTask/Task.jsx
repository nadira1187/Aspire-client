import { useDrag, useDrop } from 'react-dnd';

const Task = ({ task, onTaskDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (droppedItem) => {
      console.log('Dropped item:', droppedItem);
      console.log(`Dropped task with ID ${droppedItem.id} to 'ongoing'`);
      onTaskDrop(droppedItem, 'ongoing');
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  
  console.log(`Task with ID ${task._id} isDragging: ${isDragging}`); // Add this log statement
  console.log(`Drop info - isOver: ${drop.isOver}, canDrop: ${drop.canDrop}`); // Add this log statement
  
  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* Render your task content here */}
      <p>{task.title}</p>
    </div>
  );
};

export default Task;
