import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [oldImage, setOldImage] = useState(""); 

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:2000/student/${id}`)  
            .then((res) => {
                const student = res.data[0]; 
                setName(student.Name);
                setEmail(student.Email);
                setOldImage(student.image); 
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("image", file);

        axios
            .put("http://localhost:2000/update/" + id, formData)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="flex h-lvh items-center justify-center bg-gray-400">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>

                    {/* Hiển thị ảnh cũ nếu có */}
                    {oldImage && (
                        <div>
                            <img src={`http://localhost:2000/images/${oldImage}`} alt="Old Image" />
                        </div>
                    )}

                    <div>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="mb2">
                        <label htmlFor="">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="mb2">
                        <label htmlFor="">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudent;
