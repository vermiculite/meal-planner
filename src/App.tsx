import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Meals from './ui/Meals'
import Food from './ui/Food'
import Home from './ui/Home'
import 'antd/dist/antd.css'
import MainMenu from './ui/application/MainMenu'
import {Layout} from 'antd'

const {Header, Footer, Content} = Layout

function App() {
  return <Router>
    <Layout>
      <Header>
        <MainMenu/>
      </Header>
<Content>
  <Switch>
    <Route path="/meals">
      <Meals/>
    </Route>
    <Route path="/food">
      <Food/>
    </Route>
    <Route path="/">
      <Home/>
    </Route>
  </Switch>
</Content>
      <Footer
        style={{textAlign: 'center',}}
      >
        Meal Planner ©2020 Created by Sean Hayes
      </Footer>
    </Layout>
  </Router>
}

export default App
