export default function RezervniVesMasinaFIlter({ handleCategoryFilter }){
   
    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Grijači">Grijači</option>
                    <option value="Amortizeri">Amortizeri</option>
                    <option value="Bimetalne brave">Bimetalne brave</option>
                    <option value="Rebra bubnja">Rebra bubnja</option>  
                    <option value="Uložci četkice motora">Uložci četkice motora</option>  
                    <option value="Držači tipki">Držači tipki</option>  
                    <option value="Crijeva">Crijeva</option>  
                    <option value="Elektroventili">Elektroventili</option>  
                    <option value="Hidrostati">Hidrostati</option>  
                    <option value="Filteri i oprema za filtere">Filteri i oprema za filtere</option>  
                    <option value="Kuglični ležaji">Kuglični ležaji</option>  
                    <option value="Pumpe">Pumpe</option>  
                    <option value="Remeni">Remeni</option>  
                    <option value="Ručice vrata">Ručice vrata</option>  
                    <option value="Sonde">Sonde</option>  
                    <option value="TG VM">TG VM</option>  
                 </select>
             </div>
          </>
    )
}

 