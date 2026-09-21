import loadingImage from "./src/assets/DUCK_load.gif"

export default function LoadingState({message = "Loading..."}){

    return(
        <div>
            <img src={loadingImage}  />
            <p>{message}</p>
        </div>
    )

}