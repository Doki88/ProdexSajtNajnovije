export default function NopalFilter({ handleCategoryFilter }){
   
    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Sklopke">Sklopke</option>
                    <option value="Utičnice">Utičnice</option>
                    <option value="Razvodnici">Razvodnici</option>
                    <option value="Grla za sijalice">Grla za sijalice</option>  
                    <option value="Armature">Armature</option>  
                    <option value="Utikači">Utikači</option>  
                 </select>
             </div>
          </>
    )
}

 