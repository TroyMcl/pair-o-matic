import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const StudentList = ({students, remove, edit}) => {

  const submitButton = () => (
    <button>Save Students</button>
  )

  return (
    <div>
      {
        students.length > 0 ? submitButton() : null
      }
      <List>
        {
          students.map((student, i) => (
            <ListItem key={i}>
              <ListItemIcon>
                <DeleteIcon onClick={() => remove(student)}/>
              </ListItemIcon>
              <ListItemText
                primary={student.name}
                secondary={student.previousPairs.length ? student.previousPairs : null}
              />
              <ListItemIcon>
                <EditIcon onClick={() => edit(student)}/>
              </ListItemIcon>
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default StudentList;