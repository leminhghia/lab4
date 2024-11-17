import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const Student = () => {
  const [student, setStudent] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/')
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  }, [])
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:2000/student/' + id)
        window.location.reload()
      } catch (err) {
        console.log(err);

      }
    }
  }
  return (
    <div className="flex h-lvh items-center justify-center bg-gray-400">
      <div className="w-[full] bg-white rounded p-3">
        <Link to={'create'} className="w-20 h-14 bg-red-300" > ADD +</Link>
        <table className="table">
          <thead >
            <tr className=" ">
              <th className="border-2 border-black text-start">Image</th>
              <th className="border-2 border-black text-start">Name</th>
              <th className="border-2 border-black text-start">Email</th>
              <th className="border-2 border-black text-start">Action</th>
            </tr>
          </thead>
          <tbody >
            {
              student.map((data, index) => (
                <tr key={index}>
                  <td className="border-2 border-black"><img src={'http://localhost:2000/images/' + data.image} alt="" className="w-fit" /></td>
                  <td className="border-2 border-black">{data.Name}</td>
                  <td className="border-2 border-black">{data.Email}</td>
                  <td>
                    <Link to={`update/${data.ID}`} className="w-20 h-14 bg-red-300">Update</Link>
                    <button className="w-20 h-14 bg-red-300" onClick={() => handleDelete(data.ID)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
