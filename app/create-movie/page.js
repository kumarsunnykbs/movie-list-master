import React from "react";
import CreateAndUpdateForm from "../../components/CreateAndUpdateForm";
import AppLayout from "@/components/layout";

const CreateMovie = () => {
    return (
        <AppLayout>
            <CreateAndUpdateForm title="Create a new movie" buttonText="Submit" />
        </AppLayout>
    );
};

export default CreateMovie;
