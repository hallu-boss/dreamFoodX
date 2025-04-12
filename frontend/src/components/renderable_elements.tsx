
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

// przekazując navigate funkcja strzałkowa przejdzie domyślnie do strony głównej i odświerzy widok

export const redirectAndReload = (
    navigate: (path: string) => void,
    path: string = "/"
  ) => {
    navigate(path);
    setTimeout(() => {
        window.location.reload();
      }, 5); 
  };