import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import AddTask from './AddTask';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  switch: {
    color: 'green',
  },
  list: {
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  button: {
    backgroundColor: '#DCD5B9',
    color: 'white',
    marginRight: "2%"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  description: {
    width: "58%",
  },
  titleField: {
    width: "18%",
    marginRight: "2%"
  }
}));

function Tasks() {
  const [tasks, setTasks] = useState([])
  const classes = useStyles();
  const [stateChange, setStateChange] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [update, setUpdate] = useState('')

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTasks(data)
      })
      .catch(err => console.log(err))
  }, [stateChange])

  const handleChange = (input) => {
    console.log(input)
    setStateChange(!stateChange)
  }

  const handleUpdate = (id, status) => {
    const dataObject = { task_id: id, title: title, description: description, status: status }
    fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataObject)
    })
      .then(() => {
        setStateChange(!stateChange)
        setTitle('')
        setDescription('')
        handleOpen('')
      })
      .catch(err => console.log(err))
  }

  const handleToggle = (value, itemStatus) => () => {
    const dataObject = { task_id: value, status: itemStatus }
    fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataObject)
    })
      .then(() => setStateChange(!stateChange))
      .catch(err => console.log(err))
  };

  const handleDelete = (id) => {
    console.log("this is the id: ", id)
    fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ task_id: id })
    })
      .then(() => setStateChange(!stateChange))
      .catch(err => console.error(err))
  }

  const handleOpen = (id, title, description) => {
    setUpdate(id)
    setTitle(title)
    setDescription(description)

  }

  return (
    <>
      <AddTask change={handleChange} />
      <List className={classes.list}>
        {tasks !== [] && tasks.map((item, index) => {
          return (
            <ListItem key={item.task_id}>
              {update === item.task_id &&
                <>
                  <Button variant="contained" className={classes.button} onClick={() => handleOpen('')}>Cancel</Button>
                  <TextField defaultValue={title} id="filled-basic" label="Title" variant="filled" className={classes.titleField} onChange={(e) => { setTitle(e.target.value) }} />
                  <TextField defaultValue={description} id="filled-basic" label="Description" variant="filled" className={classes.description} onChange={(e) => { setDescription(e.target.value) }} />
                  <ListItemSecondaryAction>
                    <Button className={classes.button} vairant="contained" onClick={() => handleUpdate(item.task_id, item.status)}>Submit</Button>
                  </ListItemSecondaryAction>
                </>}
              {update !== item.task_id &&
                <>
                  <Button variant="contained" className={classes.button} onClick={() => handleOpen(item.task_id, item.title, item.description)}>Update</Button>
                  <ListItemAvatar>
                    <Tooltip title="Complete">
                      <Switch
                        color="secondary"
                        className={classes.switch}
                        edge="start"
                        onChange={handleToggle(item.task_id, !item.status)}
                        checked={item.status}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                      />
                    </Tooltip>
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete">
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon
                          onClick={() => handleDelete(item.task_id)}
                        />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </>
              }
            </ListItem>
          )
        })}
      </List>
    </>
  );
}

export default Tasks;