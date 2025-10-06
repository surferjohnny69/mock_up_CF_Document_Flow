import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import Documents from './routes/Documents'
import Preview from './routes/Preview'
import Execution from './routes/Execution'
import FromAddress from './routes/FromAddress'
import PrintPack from './routes/PrintPack'
import ShipTrack from './routes/ShipTrack'
import Active from './routes/Active'
import MyCare from './routes/MyCare'
import DevEvents from './routes/DevEvents'
import PrintInstructions from './routes/PrintInstructions'
import PrintLabel from './routes/PrintLabel'
import PrintBatch from './routes/PrintBatch'
import MyInfo from './routes/MyInfo'
import WellnessChecks from './routes/WellnessChecks'
import Education from './routes/Education'
import Settings from './routes/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/document-execution/documents" replace /> },
      { path: 'documents', element: <Navigate to="/document-execution/documents" replace /> },
      {
        path: 'document-execution',
        children: [
          { index: true, element: <Navigate to="documents" replace /> },
          { path: 'documents', element: <Documents /> },
          { path: 'preview', element: <Preview /> },
          { path: 'execution', element: <Execution /> },
          { path: 'from-address', element: <FromAddress /> },
          { path: 'print-pack', element: <PrintPack /> },
          { path: 'ship-track', element: <ShipTrack /> },
          { path: 'active', element: <Active /> },
          { path: 'my-care', element: <MyCare /> },
        ]
      },
      { path: 'my-care', element: <MyCare /> },
      { path: 'my-info', element: <MyInfo /> },
      { path: 'wellness-checks', element: <WellnessChecks /> },
      { path: 'education', element: <Education /> },
      { path: 'settings', element: <Settings /> },
      { path: 'dev-events', element: <DevEvents /> },
    ]
  },
  { path: '/print/instructions', element: <PrintInstructions /> },
  { path: '/print/label', element: <PrintLabel /> },
  { path: '/print/batch', element: <PrintBatch /> }
])
