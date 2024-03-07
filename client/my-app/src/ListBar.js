import { Box, Typography  } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';

/*
  Makes a list of candidates for the user to click. Once they click on it, change the value of selected back at Firstpage.
*/

function ListBar(props) {

    
  return <Box>
            <Typography sx = {{
                            fontSize: 30,
                            fontWeight: "bold",
                            marginTop: 3,
                            marginBottom: 2,
                            marginLeft: 3
                            
                        }}>
                Candidates
            </Typography>
            
            <List>
            {props.candidates.map((items, index) => (
            <ListItemButton onClick = {()=>{props.changeSelected(items["applicationId"])}}>
                    <ListItemIcon>
                        <PersonIcon sx = {{height: "5vh", width: "5vh"}} />
                    </ListItemIcon>
                    <ListItemText primary = {items["name"]} />
            </ListItemButton>
              ))}
            </List>
        </Box>

                    


}

export default ListBar;


/**
 * 
 
 */