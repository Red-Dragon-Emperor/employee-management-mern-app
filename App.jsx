import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Add } from "./Component/Add";
import { Edit } from "./Component/Edit";
import { EmployeeList } from "./Component/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Add } from "./Component/Add";
import { Edit } from "./Component/Edit";
import { EmployeeList } from "./Component/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
