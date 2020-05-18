import React from 'react'
import {Menu} from 'antd'
import {Link, useLocation} from 'react-router-dom'


const MainMenu = () => {
  const {pathname} = useLocation()
  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
      <Menu.Item key={'/'}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key={'/food'}>
        <Link to="/food">Food</Link>
      </Menu.Item>
      <Menu.Item key={'/meals'}>
        <Link to="/meals">Meals</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MainMenu
