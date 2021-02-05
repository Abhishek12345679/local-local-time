import React from 'react'

interface Person {
    firstname: string,
    lastname: string,
}

interface TextFieldProps {
    text: string, //string
    num?: number, //int,double
    bool?: boolean, //boolean
    fn: () => void, //function
    person: Person


}

export const TextField: React.FC<TextFieldProps> = ({ text, fn }) => {
    return (
        <div onClick={fn}>
            <p>{text}</p>
        </div>
    )
}

