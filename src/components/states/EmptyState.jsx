import nothingImage from "../../assets/DUCK_nothing.svg"

export default function LoadingState({message = "We tried, but could not find anything."}){

    return(
        <div>
            <img src={nothingImage} alt="a duck holding an empty cooking pot" />
            <p>{message}</p>
        </div>
    )

}