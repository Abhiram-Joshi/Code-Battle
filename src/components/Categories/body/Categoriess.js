import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosForBackend"
import cookie from "react-cookies"; 
import cIcon from "../../../images/c-icon.png"
import './categoriesBody.css';


const Categoriess = () => {

    const navigate = useNavigate();
    const email = cookie.load("key");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/topic/all`)
        .then((response) => {
            return response.data
        })
        .then((data) => {
            setCategories(data.data);
            console.log(categories); 
        })
        .catch((error) => {
            console.log(error);
        });
    }, [email]);

    const listItems = categories.map(category => 
        <div className="col-lg-3 category">
            <button className="no-border" onClick={() => {
                navigate('/rooms');
                cookie.save("category", category.name, { path: "/" });}}>
                <h5>{category.name}</h5>
            </button>
        </div>)

    return(
        <div className="categories-body"> 
            <h2 className="heading1 extra-bold">Categories</h2> 
            <div className="row categories">
                {listItems}
            </div>
        </div>
    )
}

export default Categoriess;