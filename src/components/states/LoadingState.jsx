import loadingImage from "../../assets/DUCK_load.gif"

export default function LoadingState({message = "Loading..."}){

    return(
        <div className="load">
            <img src={loadingImage} alt="a duck floating around the inside of a cooking pot " />
            <p>{message}</p>
        </div>
    )

}