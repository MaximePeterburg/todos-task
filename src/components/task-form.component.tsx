import { ChangeEvent, useState } from 'react';
import css from 'styled-jsx/macro';
import { PRIORITY_LEVELS } from '../store/projects/projects.types';
import Button from './ui-kit/button.component';
import FormInput from './ui-kit/form-input.component';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState(PRIORITY_LEVELS.MEDIUM);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value as PRIORITY_LEVELS);
  };

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
    <form className={className}>
      <h1 className={className}>Добавить задачу</h1>

      <FormInput value={title} onChange={handleTitleChange} label='Название' />

      <div className={className}>
        <label className={className}>Приоритет</label>
        <select
          onChange={handlePriorityChange}
          value={selectedOption}
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
        <textarea className={className} />
        {styles}
      </div>
      <Button isLoading={title.length === 0}>Создать</Button>
    </form>
  );
};

export default TaskForm;
