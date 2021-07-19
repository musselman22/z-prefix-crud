import { useEffect, useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTasks(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {tasks !== [] && tasks.map((item, index) => {
        return (
          <div key={index}>{item.task}</div>
        )
      })}
    </div>
  );
}

export default Tasks;