import React, { useEffect, useState } from 'react';

const ChecklistsContent = ({ currentStep, transactionId, setTaskCounts }) => {
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  // Function to fetch checklist data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/transactions/${transactionId}/details`
      );
      const data = await response.json();
      setStages(data.stages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching checklist data:', error);
      setIsLoading(false);
    }
  };

  // Handle task status change
  const handleCheckboxChange = async (taskId, taskStatus, stageId) => {
    if (loadingTaskId === taskId) return;

    setLoadingTaskId(taskId);
    const updatedStatus = taskStatus === 'Completed' ? 'Open' : 'Completed';

    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/transactions/${taskId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction_id: transactionId,
            task_status: updatedStatus,
            stage_id: stageId,
          }),
        }
      );

      if (response.ok) {
        console.log(
          `Task ${taskId} in stage ${stageId} status updated to ${updatedStatus}`
        );
        await fetchData();
      } else {
        console.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [transactionId]);

  // Helper function to format dates
  const formatDate = daysOffset => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysOffset);
    return currentDate.toLocaleDateString();
  };

  // Function to convert task_days into appropriate label
  const getDateLabel = taskDays => {
    if (taskDays === 0) return 'Today';
    if (taskDays === -1) return 'Yesterday';
    return formatDate(taskDays);
  };

  // Sort the tasks: Today, Yesterday, then others
  const sortTasks = tasks => {
    return tasks.sort((a, b) => a.task_days - b.task_days);
  };

  // Render tasks for each stage, excluding tasks with "remove": true
  const renderStageContent = stage => {
    const visibleTasks = stage.tasks.filter(task => !task.remove);
    const sortedTasks = sortTasks(visibleTasks); // Sort tasks before rendering

    return (
      <div key={stage.stage_id} className={`stage-${stage.stage_id}`}>
        <form>
          <div className='form-group'>
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b'>Status</th>
                  <th className='py-2 px-4 border-b'>Task Name</th>
                  <th className='py-2 px-4 border-b text-nowrap'>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map(task => (
                  <tr key={task.task_id}>
                    <td className='py-2 px-4 border-b'>
                      <label className='flex items-center space-x-2'>
                        <input
                          type='checkbox'
                          checked={task.task_status === 'Completed'}
                          disabled={loadingTaskId === task.task_id}
                          onChange={() =>
                            handleCheckboxChange(
                              task.task_id,
                              task.task_status,
                              stage.stage_id
                            )
                          }
                          className='form-checkbox h-5 w-5 text-blue-600'
                        />
                        {loadingTaskId === task.task_id && (
                          <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-gray-600'></div>
                        )}
                      </label>
                    </td>
                    <td className='py-2 px-4 border-b'>{task.task_name}</td>
                    <td className='py-2 px-2 text-nowrap border-b'>
                      {getDateLabel(task.task_days)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-48'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500'></div>
        <span className='ml-4 text-gray-500 font-semibold'>
          Loading checklist...
        </span>
      </div>
    );
  }

  if (!stages?.length) {
    return <div>No checklist data available.</div>;
  }

  return (
    <div>
      {stages.map(
        stage => stage.stage_id === currentStep + 1 && renderStageContent(stage)
      )}
    </div>
  );
};

export default ChecklistsContent;
