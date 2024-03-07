import {Container, Box, Typography  } from "@mui/material"
import ListBar from './ListBar';
import { useState, useEffect } from 'react';
import Application from './Applications';


/*
    Code for the big div that contains everything. It also serves as the information hub between the side list of candidates and what is displayed.
*/

function FirstPage() {

    const [candidates, updateCandidates] = useState([]);
    const [questions, updateQuestions] = useState([]);
    const [application, updateApplication] = useState([]);
    const [selected, changeSelected] = useState(0);

    useEffect(()=>{console.log(selected)}, [selected])

    
    //function to get all information from the backend then saves it into the respective state 
    async function getAll() {
        try {
            const response = await fetch('/candidates');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var data = await response.json();
            
            updateCandidates([...data])

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Re-throw the error to propagate it to the caller
        }

        try {
            const response2 = await fetch('/questions');
            if (!response2.ok) {
                throw new Error('Network response was not ok');
            }
            var data2 = await response2.json();

            
            updateQuestions([...data2])

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Re-throw the error to propagate it to the caller
        }

        try {
            const response3 = await fetch('/applications');
            if (!response3.ok) {
                throw new Error('Network response was not ok');
            }
            var data3 = await response3.json();

            
            updateApplication([...data3])

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Re-throw the error to propagate it to the caller
        }
    }

    //A way to make the code only happen once 
    useEffect(() => {getAll()}, [])
    
    console.log(questions)

  return <Container sx = {{
            display: "grid", 
            justifyContent: "center", 
            alignItems: "center",
        }}>
        
            <Box sx = {{
                bgcolor: '#dfe1e6',
                boxShadow: 3,
                borderRadius: "1vh",
                minWidth: 300,
                height: "80vh", 
                width: "80vw", 
                marginTop: "7.5vh",
                display: "flex"
            }}>
                
                <Box sx = {{
                    bgcolor: "#cdcfd1", 
                    height: "calc(100% - 40px)",
                    width: "calc(25vw - 40px)",
                    padding: "20px",
                    borderTopLeftRadius: "1vh", 
                    borderBottomLeftRadius: "1vh", 
                    
                }}>
                
                    <ListBar candidates = {candidates} changeSelected = {changeSelected}></ListBar>
                </Box>
                {/* passes the state properties to the respective component */}

                <Application questions = {questions} application = {application} candidates = {candidates} selected = {selected}></Application>
                
            </Box>
  </Container>
}

export default FirstPage;
