import React from 'react';

import './index.css';
import Welcome from './componenets/Welcome';
import Quiz from './componenets/Quiz';
import Profile from './componenets/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './componenets/Login';
import { Singup } from './componenets/Singup';
import QuizSetup from './componenets/QuizSetup';

function App() {
  const myRouter=createBrowserRouter([
      {path:'/',Component:Welcome},
      {path:'/login',Component:Login},
      {path:'singup',Component:Singup},
      {path:'/profile',Component:Profile},
      {path:'/quiz',Component:Quiz},
      {path:'/category',Component:QuizSetup}
  ])
  return (
    <div className="app">
        <RouterProvider router={myRouter}/>
    </div>
  );
}

export default App;
