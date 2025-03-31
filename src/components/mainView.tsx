// src/components/Auth.tsx


export const MainView = ({userLogedIn}) => {
    
  return (
    <div>
      <p className="header-text">Strona główna</p>
        <div className="header-text">
            {<p  className=" text-[75%]">Witaj: {userLogedIn.name} !!!</p>}

        </div>
    </div>
  );
};


