import React from "react";


// Przycisk odwzorowujący zaloguj, wygloguj, zarejestruj z pełnym formatowaniem
export const actionButton = (name:string, onClicFunction: () => void) => {
    return (
        <div className= "flex justify-center" >
          <button className="btn btn-size items-center" onClick={onClicFunction}>
              {name}
          </button>
        </div>
    )
}