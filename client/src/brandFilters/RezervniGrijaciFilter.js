export default function RezervniGrijaciFilter({ handleCategoryFilter }){

    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Grijači za šporet">Grijači za šporet</option>
                    <option value="Dihtunzi">Dihtunzi</option>
                    <option value="Ringle">Ringle</option>
                    <option value="Prekidači šporeta">Prekidači šporeta</option>  
                    <option value="Termostati">Termostati</option>  
                    <option value="Plinska oprema">Plinska oprema</option>  
                    <option value="Šarke za vrata">Šarke za vrata</option>  
                    <option value="Kleme">Kleme</option>  
                    <option value="Sijalice za rernu">Sijalice za rernu</option>  
                    <option value="Dugmad za šporet">Dugmad za šporet</option>  
                    <option value="Tinjalice">Tinjalice</option>  
                    <option value="Filteri">Filteri</option>  
                    <option value="Reduciri">Reduciri</option>  
                    <option value="Buksne">Buksne</option>  
                 </select>
             </div>
          </>
    )
}

 