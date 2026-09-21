import errorImage from "../../assets/DUCK_someing_wrong.svg"

export default function LoadingState({message = "We could not load the recipes right now. Please try again later."}){

    return(
        <div>
            <img src={errorImage} alt="a duck crying over a spilled cooking pot" />
            <p>{message}</p>
        </div>
    )

}