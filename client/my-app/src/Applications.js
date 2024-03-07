import { Box, Typography, TextField , Button} from "@mui/material";
import React, { useEffect, useState, useRef} from 'react'
import ReactPlayer from 'react-player'


/*
    The display aspect of it. It always look for the selected state in Firstpage then updates it to the corresponding candidate info
*/

function Application(props) {

    
    const [commentHold, updateComment] = useState({});
    const [saveAvailable, disableSave] = useState(false);

    //If the candidate has an application, it brings out the appropriate one

    if (props.selected !== undefined && props.selected != 0){
        
        var application = props.application.find(app => app.id === props.selected)
        
    }
   
    //This exist to send a post request to update the comment 

    const updateIndex = async (index) => {
        console.log("start");

        //disable the option to edit comments 
        disableSave(true);
        
        var textWord = commentHold[index]

        if ( textWord === undefined){
            textWord = ""
        }

       
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personId: application.id, questionId: application.videos[index].questionId, newComment: textWord })
        };
    
        try {
            const response = await fetch("/comment", requestOptions);
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const message = await response.json();
            console.log("worked", message);
        } catch (error) {
            console.log(error)
            console.error('There was a problem with your fetch operation:', error);
        }
        
        //bring back the option 
        disableSave(false);
    };
    
   
    //Basically just gives a nothing found or please select if the applicant does not have applications or has not selected anyone
    if (props.selected === undefined || props.selected === 0){
        return <Box sx = {{
            overflow: "auto", 
            height: "100%", 
            width: "100%", 
            display: "grid", 
            alignItems: "center",
            justifyContent: "center"
          }}>
                <Typography sx = {{
                    fontSize: "8vh",
                    fontWeight: "bold", 
                    color: "grey"
                }}>
                    {props.selected == 0 ? "Please Select" : "No Application Made"}
                </Typography>
          </Box>
    }
    

    return <Box sx = {{
        
        height: "100%", 
        width: "100%", 
        display: "grid", 
        alignItems: "center",
        justifyContent: "center",
    }}>
            <Box sx = {{
                overflow: "auto", 
                height: "75vh", 
                width: "55vw"
            }}>
                
                <Typography sx = {{
                    fontSize: 30,
                    }}
                >{props.candidates.find(can => can.applicationId === application.id).name}
                </Typography>

                {/*Display the candidate name */}

                {application.videos.map((items, index) => (


                    <Box sx = {{display: "grid"}}>

                        <Typography sx = {{
                        fontSize: 25,
                        fontStyle: "italic",
                        marginTop: 5,
                        marginBottom: 3,
                        }}
                        >{props.questions.find(ques => ques.id == items.questionId).question}
                        </Typography>

                        {/*Display all the questions tht was asked*/}


                        {/*The video and comment together*/}

                        <Box sx = {{display: "grid", alignItems: "center", justifyContent: "center", width: "100%"}}>
                            <ReactPlayer style = {{width: "auto", height: "auto"}} url = {items.src} controls = {true} ></ReactPlayer>

                            <TextField
                                id="standard-multiline-static"
                                label= "Comment"
                                multiline
                                rows={2}
                                value = {application.videos[index].comments}
                                variant="standard"
                                sx = {{
                                    width: "100%",
                                    marginTop: 2,
                                }}

                            onChange = {(event)=>{

                            application.videos[index].comments = event.target.value

                            updateComment(prevState => ({
                            ...prevState,
                            [index]: event.target.value

                            }));
                        
                        }}
                        />

                        <Button variant="outlined" sx = {{width: 100, marginTop: 2}} disabled = {saveAvailable} onClick={()=>{updateIndex(index)}}>SAVE</Button>
                        
                        </Box>
                        
                        <br></br>          
                        
                    </Box>
                    
                ))}
                

            </Box>

        </Box>

                    


}

export default Application;


/**
 * 
 
 */