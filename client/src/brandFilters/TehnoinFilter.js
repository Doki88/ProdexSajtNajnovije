export default function TehnoinFilter({ handleCategoryFilter }){

    return (
          <>
             <div className="brand-filter">
                <select onChange={handleCategoryFilter}>
                    <option value="">Prikazi sve</option>
                    <option value="Aspiratori">Aspiratori</option>
                    <option value="Ventilatori">Ventilatori</option>
                    <option value="Kablovi za za štednjak">Kablovi za za štednjak</option>
                    <option value="Kućišta">Kućišta</option>  
                    <option value="Produžni kablovi">Produžni kablovi</option>  
                    <option value="Adapteri">Adapteri</option>  
                    <option value="Table za osigurače">Table za osigurače</option>  
                    <option value="Telefonski kablovi">Telefonski kablovi</option>  
                    <option value="Grijalice">Grijalice</option>  
                    <option value="Kaloriferi">Kaloriferi</option>  
                    <option value="Nosači kalorifera">Nosači kalorifera</option>  
                    <option value="Termostati">Termostati</option>  
                    <option value="Motorne zaštitne sklopke">Motorne zaštitne sklopke</option>  
                    <option value="Al crijeva aspiratora">Al crijeva aspiratora</option>  
                    <option value="Crijeva UV bužira">Crijeva UV bužira</option>  
                 </select>
             </div>
          </>
    )
}

 