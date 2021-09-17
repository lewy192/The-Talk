import React, { useState } from "react";

export const useForm = (initialState = {}, onSubmit) => {
    const [formState, setFormState] = useState(initialState);

    const handleFormChange = (event) => {
        const {
            target: { name, value },
        } = event;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formState);
        setFormState(initialState);
    };

    return { formState, handleFormChange, handleFormSubmit };
};
