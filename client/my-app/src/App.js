import {BrowserRouter, Route, Routes} from "react-router-dom";
import FirstPage from './FirstPage';

function App() {
  return (

    <div>
      <BrowserRouter>

      <Routes>
        <Route path="/" element = {<FirstPage/>}/>
      </Routes>

      </BrowserRouter>

    </div>
      

  );
}

export default App;
