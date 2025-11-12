import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import "../../../styles/productLists.css"

export default function ProductList(){

    
    const [products, setProducts] = useState([])
    const {userCredentials, setUserCredentials} = useContext(AppContext)
    const navigate = useNavigate()

    //pagination functionality
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 52

    //search functionality
    const [search, setSearch] = useState("")

    // sort functionality
    const [sortColumn, setSortColumn] = useState({column: "id", orderBy: "desc"})

    function getProducts(){

        let url = '';

        if (process.env.NODE_ENV === 'production') {
            url = `https://prodexmd.ba/api/products?page=${currentPage}&perPage=${pageSize}&search=${search}`;
        } else {
             url = `http://localhost:5000/api/products?page=${currentPage}&perPage=${pageSize}&search=${search}`;
        }

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${userCredentials?.token}`,
            }
        })

        .then(response => {
           
            if(response.ok){
                 
                return response.json()
            }

            throw new Error()
        })
        .then(data => {

            //console.log("API data received:", data)
           
            setProducts(data.products)
            
            setCurrentPage(data.pagination.currentPage)
            setTotalPages(data.pagination.totalPages)
        })
        .catch(error => {
            alert("Unable to get the data now" + error )
        })
    }

    useEffect(getProducts, [currentPage, search, sortColumn])

    function deleteProduct(id) { 
        if (window.confirm("Da zi želite da obrišete ovaj artikal? ")) {
            //fetch( `http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
            fetch( `https://prodexmd.ba/api/products/${id}`, { method: 'DELETE' })
            .then(async response => {
                const data = await response.json();
                 // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    //return Promise.reject(error);
                }
                getProducts()
                //setStatus('Delete successful');
            })
            .catch(error => {
                //setErrorMessage(error);
                alert('error: '+error)
                console.error('There was an error!', error);
            });
          } else {
            
          }
       
        
    }

 
    // Helper to build a page button
    const pageButton = (label, page, active = false, disabled = false) => (
    <li
        className={`page-item ${active ? "page-item-active" : ""} ${disabled ? "disabled" : ""}`}
        key={`page-${label}-${page}`}
    >
        <a
        className="page-link"
        href={"?page=" + page}
        onClick={(e) => {
            e.preventDefault();
            if (!disabled && page !== currentPage) setCurrentPage(page);
        }}
        >
        {label}
        </a>
    </li>
    );

    let paginationButtons = [];

    // Prev arrow
    if (currentPage > 1) {
    paginationButtons.push(pageButton("«", currentPage - 1));
    }

    // Always show first page
    paginationButtons.push(pageButton("1", 1, currentPage === 1));

    const pageNeighbours = 2; // pages to show around current
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    // Show ellipsis if there is a gap between page 1 and startPage
    if (startPage > 2) {
    paginationButtons.push(
        <li key="start-ellipsis" className="page-item disabled">
        <span className="page-link">…</span>
        </li>
    );
    }

    // Page cluster around current
    for (let page = startPage; page <= endPage; page++) {
    paginationButtons.push(pageButton(page, page, page === currentPage));
    }

    // Show ellipsis before the last page if there’s a gap
    if (endPage < totalPages - 1) {
    paginationButtons.push(
        <li key="end-ellipsis" className="page-item disabled">
        <span className="page-link">…</span>
        </li>
    );
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
    paginationButtons.push(
        pageButton(totalPages.toString(), totalPages, currentPage === totalPages)
    );
    }

    // Next arrow
    if (currentPage < totalPages) {
    paginationButtons.push(pageButton("»", currentPage + 1));
    }



    //search funcitionality
    function handleSearch(event){
        event.preventDefault()

        
        let text = event.target.search.value
        setSearch(text)
        setCurrentPage(1)

    }

    // sort functionality
    function sortTable(column){
        let orderBy = "desc"

        if(column === sortColumn.column){
            // reverse orderBy
            if(sortColumn.orderBy === "asc") orderBy = "desc"
            else orderBy = "asc"
        }

        setSortColumn({column: column, orderBy: orderBy})
    }
    return(
        <div className="container my-4">
            <h2 className="text-center mb-4">Proizvodi</h2>

            
           {/* Top row: Katalozi + Narudzbe on left, Ucitaj ponovo on right */}
<div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
    <div className="d-flex flex-wrap align-items-center mb-2 mb-md-0">
        <Link className="btn btn-secondary me-2 mb-2" to="/admin/products">Proizvodi</Link>
        <Link className="btn btn-primary me-2 mb-2" to="/admin/catalogs">Katalozi</Link>
        <Link className="btn btn-primary me-2 mb-2" to="/admin/orders">Narudžbe</Link>
        <Link className="btn btn-primary me-2 mb-2" to="/admin/users">Korisnici</Link>
    </div>
    <div className="mb-2 mb-md-0">
        <button type="button" className="btn btn-outline-primary" onClick={getProducts}>
            Učitaj ponovo
        </button>
    </div>
</div>

            {/* Second row: Dodaj novi proizvod on left, Search on right */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="mb-2 mb-md-0">
                    <Link className="btn btn-success" to="/admin/products/create">
                        Dodaj novi proizvod
                    </Link>
                </div>
                <div>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Pretraga" name="search"/>
                        <button className="btn btn-outline-success" type="submit">Pretraga</button>
                    </form>
                </div>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        {/* <th style={{ cursor: "pointer"}} onClick={() => sortTable("id")}>
                            ID <SortArrow column ="id" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th> */}
                        <th style={{ cursor: "pointer"}} onClick={() => sortTable("name")}>
                            Naziv <SortArrow column ="name" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th>
                        <th style={{ cursor: "pointer"}} onClick={() => sortTable("brand")}>
                            Katalog <SortArrow column ="brand" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th>
                        <th style={{ cursor: "pointer"}} onClick={() => sortTable("category")}>
                            Šifra <SortArrow column ="serialNumber" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th>
                        <th style={{ cursor: "pointer"}} onClick={() => sortTable("price")}>
                            Cena <SortArrow column ="price" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th>
                        {/* <th >
                            Image
                        </th>
                        <th style={{ cursor: "pointer"}} onClick={() => sortTable("createdAt")}>
                            Created At <SortArrow column ="createdAt" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}/>
                        </th> */}
                        {/* <th style={{ cursor: "pointer"}}>
                            Action
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td>{product._id}</td> */}
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.serialNumber}</td>
                                    <td>{product.price}KM</td>
                                    {/* <td><img src={product.image1}
                                        width="100" alt="..."/></td>  */}
                                    {/* <td>{product.createdAt.slice(0, 10)}</td> */}
                                    <td style={{width: "10px", whiteSpace: "nowrap"}}>
                                        <Link className="btn btn-primary btn-sm me-1"
                                            to={"/admin/products/edit/" + product._id }>Izmijeni</Link>
                                        <button type="button" className="btn btn-danger btn-sm"
                                            onClick={() => deleteProduct(product._id)}>Obrisi</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

            <ul className="pagination">{paginationButtons}</ul>

        </div>
    )
}

function SortArrow({column, sortColumn, orderBy}) {
    if (column !== sortColumn) return null

    if(orderBy === "asc"){
        return <i className="bi bi-arrow-up"></i>
    }
    
    return <i className="bi bi-arrow-down"></i>
}

 
