import helpImage from "../../assets/DUCK_help.svg"

export default function NotFoundState({message = "We're not doctors, but we will try and fix."}){

    return(
        <div>
            <img src={helpImage} alt="a duck wearing glasses. a medic bag and a note that says 'permit to try'" />
            <p>{message}</p>
        </div>
    )

}