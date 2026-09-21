import nothingImage from "../../assets/DUCK_nothing.svg"

export default function EmptyState({message = "We tried, but could not find anything."}){

    return(
        <div className="state">
            <img src={nothingImage} alt="a duck holding an empty cooking pot" />
            <p>{message}</p>
        </div>
    )

}