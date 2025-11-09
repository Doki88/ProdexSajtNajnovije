export default function AlingPrestigeFIlter({ handleCategoryFilter }){

   
    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Sklopke">Sklopke</option>
                    <option value="Regulatori jačine svijetlosti">Regulatori jačine svijetlosti</option>
                    <option value="Maske">Maske</option>
                    <option value="Adapteri">Adapteri</option>  
                    <option value="Priključnice">Priključnice</option>  
                    <option value="Kutije za stalni priključak">Kutije za stalni priključak</option>  
                    <option value="Sklopke nazidne">Sklopke nazidne</option>  
                    <option value="Priključnice nazidne">Priključnice nazidne</option>  
                    <option value="Razvodne kutije nazidne">Razvodne kutije nazidne</option>  
                    <option value="Utikači">Utikači</option>  
                    <option value="Set pribor za produžni kabal">Set pribor za produžni kabal</option>  
                 </select>
             </div>
          </>
    )
}

 