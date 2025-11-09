import { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function Login(){

     
    const navigate = useNavigate()
    const { userCredentials, setUserCredentials } = useContext(AppContext)
    const location = useLocation();

   
    const from = location.state?.from?.pathname || "/"; // fallback



    // if(userCredentials){
    //     return <Navigate to="/"/>
    // }

    // async function handleSubmit(event){

    //     event.preventDefault()

    //     let username = event.target.username.value
    //     let password = event.target.password.value

    //     if(!username || !password){
    //         alert("Please fill the login form")
    //         return
    //     }
        
    //     const credentials = {username, password}

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({credentials})
    //     };
    //     //   fetch('http://localhost:5000/api/users/login', requestOptions)
    //     fetch('https://prodexmd.ba/api/users/login', requestOptions)
    //         .then(async response => {
    //             const isJson = response.headers.get('content-type')?.includes('application/json');
    //             const data = isJson && await response.json();

    //             // check for error response
    //             if (!response.ok) {
    //                 console.log('evo me tu')
    //                 // get error message from body or default to response status
    //                 const error = (data && data.message) || response.status;
    //                 //return Promise.reject(error);
    //             }
                 
                
    //             setUserCredentials(data)

    //             // console.log('Kredencijali su: ')
    //             // console.log(userCredentials)

    //             navigate("/admin/products")
    //             //this.setState({ postId: data.id })
    //         })
    //         .catch(error => {
    //             //this.setState({ errorMessage: error.toString() });
    //             console.error('There was an error!', error);
    //         });
    // }
    async function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        if (!username || !password) {
            alert("Molimo vas da popunite formu");
            return;
        }

        const credentials = { username, password };

        try {
            const response = await fetch('https://prodexmd.ba/api/users/login', {
            // const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credentials })
            });

            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            alert("Neuspješan login: " + error);
            return;
            }

            setUserCredentials(data); // this updates context
            //navigate("/admin/products");
            navigate(from, { replace: true });

        } catch (error) {
            console.error("There was an error!", error);
            alert("An unexpected error occurred.");
        }
}

    return (
        <div className="container my-4">
            <div className="mx-auto rounded border p-4" style={{width: "400px"}}>
                <h2 className="text-center mb-5">Uloguj se</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input className="form-control" name="username"></input>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Lozinka:</label>
                        <input className="form-control" type="password" name="password"></input>
                    </div>

                    <div className="row">
                        <div className="col d-grid">
                            <button type="submit" className="btn btn-primary">Uloguj se </button>
                        </div>
                        {/* <div className="col d-grid">
                            <Link className="btn btn-outline-primary" to="/" role="button">Ponisti</Link>
                        </div> */}
                    </div>

                </form>
            </div>
        </div>
    )
}