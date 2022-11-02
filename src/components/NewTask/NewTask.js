import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = ({ onAddTask }) => {
  const { isLoading, error, sendRequest: addNewTask } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    addNewTask(
      {
        url: 'https://star-wars-api-8d386-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
