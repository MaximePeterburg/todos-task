import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from 'styled-jsx/macro';
import { PRIORITY_LEVELS, TASK_STATUS } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import { ProjectRouteParams } from './project-container.component';
import Button from './ui-kit/button.component';
import FormInput from './ui-kit/form-input.component';

type TasksFormProps = {
  taskStatus: TASK_STATUS;
};

const TaskForm = ({ taskStatus }: TasksFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriorityOption, setSelectedPriorityOption] = useState(
    PRIORITY_LEVELS.MEDIUM
  );

  const { addTaskStart } = useStore();

  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedPriorityOption(value as PRIORITY_LEVELS);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const createdAt = new Date();

      const taskAddedToProject = {
        taskItem: {
          title,
          description,
          priority: selectedPriorityOption,
          status: taskStatus,
          createdAt,
          id: createdAt.toString()
        },
        projectId
      };
      addTaskStart(taskAddedToProject);
    },
    [addTaskStart]
  );

  const { className, styles } = css.resolve`
    form {
      min-width: 40rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    h1 {
      padding: 1.5rem;
    }
    label {
      font-weight: 600;
    }
    div {
      width: 100%;
      padding: 1rem 0 0 0;
    }
    textarea {
      width: 100%;
      height: 5rem;
      padding: 0.75rem 0.75rem 0.75rem 0.325rem;
    }
    textarea:focus {
      border-color: #ffa500;
      outline: none;
    }
    select {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 0.325rem;
    }
    select:focus {
      border-color: #ffa500;
      outline: none;
    }
  `;
  return (
    <form onSubmit={handleSubmit} className={className}>
      <h1 className={className}>Добавить задачу</h1>

      <FormInput value={title} onChange={handleTitleChange} label='Название' />

      <div className={className}>
        <label className={className}>Приоритет</label>
        <select
          onChange={handlePriorityChange}
          value={selectedPriorityOption}
          className={className}>
          <option className={className} value={PRIORITY_LEVELS.LOW}>
            Низкий
          </option>
          <option className={className} value={PRIORITY_LEVELS.MEDIUM}>
            Средний
          </option>
          <option className={className} value={PRIORITY_LEVELS.HIGH}>
            Высокий
          </option>
        </select>
      </div>
      <div className={className}>
        <label className={className}>Описание</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className={className}
        />
        {styles}
      </div>
      <Button type='submit' isLoading={title.length === 0 || description.length === 0}>
        Создать
      </Button>
    </form>
  );
};

export default TaskForm;
