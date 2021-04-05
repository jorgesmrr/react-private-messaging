import Field from "@bit/jorgemoreira.react.input.field";
import React, { useState } from "react";
import Button from "../button/Button";
import TextField from "../text-field/TextField";

export interface SignUpFormRoomIdProps {
    onSubmit: (id: string) => void;
}

const SignUpFormRoomId: React.FC<SignUpFormRoomIdProps> = ({ onSubmit }) => {
    const [id, setId] = useState<string>();

    return (
        <div>
            <Field label="Enter the room id">
                <TextField value={id} onInput={setId} />
            </Field>
            <Button onClick={() => id && onSubmit(id)}>Join</Button>
        </div>
    );
};

export default SignUpFormRoomId;
