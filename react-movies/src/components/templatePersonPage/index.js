import React from "react";
import Grid from "@mui/material/Grid2";

const TemplatePersonPage = ({ person, children }) => {

    return (
        <>
                <Grid size={{xs: 9}}>
                    {children}
                </Grid>
        </>
    );
};

export default TemplatePersonPage;