import React, { useEffect, useState } from 'react';

const ChecklistsContent = ({
  currentStep, // Step indicator passed to the component
  transactionId, // Transaction ID passed to the component
  setTaskCounts,
}) => {
  const [stages, setStages] = useState([]); // Store stages data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [loadingTaskId, setLoadingTaskId] = useState(null); // Task loading state (for API request loading)
  console.log('checksurrent', currentStep);
  console.log('checktrans', transactionId);
  // Function to fetch checklist data
  const fetchData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/transactions/${transactionId}/details`
      );
      const data = await response.json();
      console.log('Fetched Stages:', data.stages); // Check the data structure
      setStages(data.stages); // Set the stages from API response
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching checklist data:', error);
      setIsLoading(false); // Set loading to false on error as well
    }
  };

  // Function to handle task status change (now includes stage_id)
  const handleCheckboxChange = async (taskId, taskStatus, stageId) => {
    if (loadingTaskId === taskId) return; // Prevent multiple clicks on the same task

    setLoadingTaskId(taskId); // Set task loading ID to block multiple clicks

    const updatedStatus = taskStatus === 'Completed' ? 'Open' : 'Completed'; // Toggle task status

    // Save task status in local storage
    const taskDetails = {
      task_id: taskId,
      task_status: updatedStatus,
      transaction_id: transactionId,
      stage_id: stageId, // Include stage_id here
    };
    localStorage.setItem(`task_${taskId}`, JSON.stringify(taskDetails));

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
            stage_id: stageId, // Send stage_id in the request body
          }),
        }
      );

      if (response.ok) {
        console.log(
          `Task ${taskId} in stage ${stageId} status updated to ${updatedStatus}`
        );
        await fetchData(); // Refresh data after status change

        const apiData = await response.json();
        setTaskCounts({
          completedTaskCount: apiData.completed_tasks,
          totalTaskCount: apiData.total_tasks,
          openTaskCount: apiData.total_tasks - apiData.completed_tasks,
        });
      } else {
        console.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setLoadingTaskId(null); // Clear the task loading state
    }
  };

  useEffect(() => {
    fetchData(); // Fetch checklist data when the component mounts or transactionId changes
  }, [transactionId]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-48'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
        <span className='ml-4 text-blue-500 font-semibold'>
          Loading checklist...
        </span>
      </div>
    );
  }

  if (!stages?.length) {
    return <div>No checklist data available.</div>;
  }

  // Render tasks for each stage
  const renderStageContent = stage => (
    <div key={stage.stage_id} className={`stage-${stage.stage_id}`}>
      <form>
        <div className='form-group'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Status</th>
                <th className='py-2 px-4 border-b'>Task Name</th>
              </tr>
            </thead>
            <tbody>
              {stage.tasks.map(task => (
                <tr key={task.task_id}>
                  <td className='py-2 px-4 border-b'>
                    <label className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        checked={task.task_status === 'Completed'}
                        disabled={loadingTaskId === task.task_id} // Disable checkbox while API is processing
                        onChange={() =>
                          handleCheckboxChange(
                            task.task_id,
                            task.task_status,
                            stage.stage_id // Pass stage_id to the handler
                          )
                        }
                        className='form-checkbox h-5 w-5 text-blue-600'
                      />
                      {loadingTaskId === task.task_id && (
                        <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-blue-600'></div>
                      )}
                    </label>
                  </td>
                  <td className='py-2 px-4 border-b'>{task.task_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );

  // Map currentStep to stage based on stage_id (1-based index)
  return (
    <div>
      {stages.map(
        stage => stage.stage_id === currentStep + 1 && renderStageContent(stage)
      )}
    </div>
  );
};

export default ChecklistsContent;
