import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { DonateNow } from "./pages/DonateNow";
import About from "./pages/About";
import { UploadDocuments } from "./pages/UploadDocs";
import NotFound from "./pages/NotFound";
import { OrgDashboard } from "./pages/OrgDashboard";
import { UserDashboard } from "./pages/Dashboard";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="/dashboard/user" element={<UserDashboard/>}/>
        <Route path="/dashboard/org" element={<OrgDashboard/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/donate" element={<DonateNow/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/upload/docs" element={<UploadDocuments/>}/>
        <Route path="" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;