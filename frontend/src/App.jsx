import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Student from './page/Student'
import CreateStudent from './page/CreateStudent'
import UpdateStudent from './page/UpdateStudent'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Student/>}  />
        <Route  path='/create' element={<CreateStudent/>} />
        <Route  path='/update/:id' element={<UpdateStudent/>} />
       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
