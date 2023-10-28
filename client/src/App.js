import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./View/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout/LayoutWrap";
import ChatScreen from "./View/ChatScreen";
import LayoutChat from "./Layout/LayoutChat";
import FriendScreen from "./View/FriendScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/chat-app/login" element={<Login/>}/>
          <Route path="/chat-app/chat" element={<LayoutChat/>}>
            <Route index element={<ChatScreen/>}/>
            <Route path="list-friend" element={<FriendScreen/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
