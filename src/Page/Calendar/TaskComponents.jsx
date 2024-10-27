import React, { useEffect, useState } from 'react';

const formatDate = date =>
  date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  export const fetchTasks = async () => {
  const response = await fetch('https://api.tkglisting.com/api/dates/calendar');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.transactions.flatMap(transaction =>
    transaction.dates.map(date => ({
      transactionName: transaction.transaction_name,
      address: `${transaction.address}, ${transaction.city}, ${transaction.state}`,
      taskName: date.task.task_name,
      enteredDate: new Date(date.entered_date),
      taskStatus: date.task.task_status,
    }))
  );
};

const TaskTable = ({ tasks }) => (
  <table className='w-full border border-gray-200 rounded-lg'>
    <thead>
      <tr className='border-b text-nowrap'>
        <th className='px-4 py-2 text-left text-gray-600'>Transaction</th>
        <th className='px-4 py-2 text-left text-gray-600'>Address</th>
        <th className='px-4 py-2 text-left text-gray-600'>Task Description</th>
        <th className='px-4 py-2 text-left text-gray-600'>Task Days</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task, index) => (
        <tr
          key={index}
          className='border-b hover:bg-gray-50 transition duration-150 ease-in-out'
        >
          <td className='px-4 py-3 flex items-center'>
            <input type='checkbox' className='mr-2' />
            <span className='text-nowrap'>Transaction</span>
          </td>
          <td className='px-4 py-3'>{task.address}</td>
          <td className='px-4 py-3'>{task.taskName}</td>
          <td className='px-4 py-3 text-nowrap'>
            {formatDate(task.enteredDate)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Individual Task Category Components
export const ScheduledTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      const today = new Date().toDateString();
      setTasks(data.filter(task => task.enteredDate.toDateString() === today));
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export const ThisWeekTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

      setTasks(
        data.filter(
          task =>
            task.enteredDate >= startOfWeek && task.enteredDate <= endOfWeek
        )
      );
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export const ThisMonthTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      setTasks(
        data.filter(
          task =>
            task.enteredDate >= startOfMonth && task.enteredDate <= endOfMonth
        )
      );
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export const OverdueTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      setTasks(
        data.filter(
          task =>
            task.enteredDate < new Date() && task.taskStatus !== 'Completed'
        )
      );
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export const FinishedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTasks();
      setTasks(data.filter(task => task.taskStatus === 'Completed'));
    };
    getData();
  }, []);

  return <TaskTable tasks={tasks} />;
};

export default {
  FinishedTasks,
  OverdueTasks,
  ScheduledTasks,
  ThisMonthTasks,
  fetchTasks,
  ThisWeekTasks,
  TodayTasks,
};
