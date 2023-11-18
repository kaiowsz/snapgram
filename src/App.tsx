import { Routes, Route } from "react-router-dom"
import "./globals.css"

import SignIn from "./_auth/forms/SignIn"
import SignUp from "./_auth/forms/SignUp"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"

import { Home } from "./_root/pages"

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            <Route element={<AuthLayout /> }>
                <Route path="/signin" element={ <SignIn /> } />
                <Route path="/signup" element={ <SignUp /> } />
            </Route>

            <Route element={ <RootLayout /> } ></Route>
            <Route index element={<Home />} />
        </Routes>
    </main>
  )
}

export default App