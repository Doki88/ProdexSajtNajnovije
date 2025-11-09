export default function AlingModularFilter({ handleCategoryFilter }){
    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Sklopke">Sklopke</option>
                    <option value="Tasteri za sklopke">Tasteri za sklopke</option>
                    <option value="Priključnice">Priključnice</option>
                    <option value="Maske">Maske</option>
                    <option value="Prirubnice">Prirubnice</option>  
                    <option value="Adapteri">Adapteri</option>  
                    <option value="Kutije za ugradnju prirubnice">Kutije za ugradnju prirubnice</option>  
                    <option value="Slijepi moduli">Slijepi moduli</option>
                 </select>
             </div>
          </>
    )
}

 