import React, { useState } from "react";
import TextField from "../../text-field/TextField";
import Field from "@bit/jorgemoreira.react.input.field";
import Spinner from "@bit/jorgemoreira.react.progress.spinner";
import Button from "../../button/Button";

export interface UsernameFormProps {
    isSigningIn: boolean;
    isOffline: boolean;
    errorMessage?: string;
    onSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
    isSigningIn,
    isOffline,
    errorMessage,
    onSubmit,
}) => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState<string | boolean>(false);

    const errorToShow = usernameError || errorMessage;

    const validateUsername = (username: string) => {
        setUsername(username);

        if (!/^[a-zA-Z0-9-]+$/.test(username)) {
            setUsernameError("Please use only alphanumeric characters");
        } else if (username.length > 20) {
            setUsernameError("Please don't use more than 20 characters");
        } else {
            setUsernameError(false);
        }
    };

    const onSubmitClick = () => {
        if (!usernameError) onSubmit(username);
    };

    const hint = isSigningIn
        ? undefined
        : "Only alphanumeric characteres are allowed, without spaces";

    const usernameInput = !isSigningIn && !isOffline && (
        <TextField
            error={!!errorToShow}
            disabled={isOffline}
            onChange={validateUsername}
            onEnter={onSubmitClick}
        />
    );

    return (
        <div>
            <Field label="Choose a username" hint={hint} error={errorToShow}>
                {usernameInput}
            </Field>
            {isSigningIn && !isOffline && (
                <Spinner inline>Please wait...</Spinner>
            )}
            {!isSigningIn && !isOffline && (
                <Button primary onClick={onSubmitClick}>
                    Next
                </Button>
            )}
        </div>
    );
};

export default UsernameForm;
