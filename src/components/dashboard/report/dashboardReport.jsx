import React from 'react'
import ReportHeader from './reportHeader'
import ReportNavbar from './reportNavbar'
import ReportList from './reportList'

const DashboardReport = () => {
  return (
    <div className="bg-[#1F1D2B] rounded-xl overflow-y-scroll h-[28rem]">
        <ReportHeader />
        <ReportNavbar />
        <ReportList />
    </div>
  )
}

export default DashboardReport