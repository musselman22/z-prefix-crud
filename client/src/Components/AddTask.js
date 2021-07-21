import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: "2%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "1%",
    justifyContent: "space-between",
    borderBottom: "1px black solid"
  },
  button: {
    backgroundColor: '#DCD5B9',
    color: 'white',
    width: "18%"
  },
  description: {
    width: "58%",
  },
  titleField: {
    width: "18%"
  },
  addTitle: {
    marginLeft: "2%",
    marginTop: "2%",
  },
}));


export default function AddTask(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = () => {
    const dataObject = { title: title, description: description, status: false }
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataObject)
    })
      .then(() => {
        props.change()
        setTitle('')
        setDescription('')
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      <Typography variant="h4" component="h4" className={classes.addTitle}>
        Add a task
      </Typography>
      <div className={classes.form}>
        <TextField value={title} id="filled-basic" label="Title" variant="filled" className={classes.titleField} onChange={(e) => { setTitle(e.target.value) }} />
        <TextField value={description} id="filled-basic" label="Description" variant="filled" className={classes.description} onChange={(e) => { setDescription(e.target.value) }} />
        <Button className={classes.button} vairant="contained" onClick={handleAdd}>Add Task</Button>
      </div>
    </>
  )

}