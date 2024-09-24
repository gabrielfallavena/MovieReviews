import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        //Remove o token do local storage
        localStorage.removeItem('token');
        //Redireciona para a pagina home
        navigate('/');
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Deslogando...</h1>
        </div>
    );
};
export default Logout;


