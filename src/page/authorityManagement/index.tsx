import React from "react"
import { Outlet } from "react-router-dom"
import Transiton from "../../components/transiton"
const { Suspense } = React
const AuthorityManagement: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Transiton/>}>
        <Outlet/>
      </Suspense>
    </>
  )
}

export default AuthorityManagement