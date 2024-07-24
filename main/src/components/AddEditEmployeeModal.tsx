import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../store/employeeSlice";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

interface Props {
    open: boolean;
    onClose: () => void;
    employee?: {
        id: string;
        name: string;
        organizationId: string;
    }
    organizationId: string
}

export const AddEditEmployeeModal = ({ open, onClose, employee, organizationId }: Props) => {
    const dispatch = useDispatch();
    const { classes } = useStyles();

    const handleSubmit = (values: {id: string, name: string }) => {
        if (employee) {
            dispatch(updateEmployee({ ...values, organizationId }));
        } else {
            dispatch(addEmployee({id: String(Date.now()), name: values.name, organizationId}));
        }
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={classes.modal}>
                <Formik initialValues={{id: employee?.id || '', name: employee?.name || ''}} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                        <Field name="name" as={TextField} label="Имя" fullWidth margin="normal"/>
                        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>Сохранить</Button>
                    </Form>)}
                </Formik>
            </Box>
        </Modal>
    )
}