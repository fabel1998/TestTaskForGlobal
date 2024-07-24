import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { deleteEmployee } from "../store/employeeSlice"; 
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AddEditEmployeeModal } from "./AddEditEmployeeModal";
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    table: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export const EmployeeList = () => {
    const { id } = useParams<{ id:string }>();
    const employees = useSelector((state: RootState) => state.employees.employees.filter((employee) => employee.organizationId === id));
    const dispatch: AppDispatch = useDispatch();
    const { classes } = useStyles();

    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<{id: string; name: string; organizationId: string} | undefined>(undefined);

    const handleDelete = (id: string) => {
        dispatch(deleteEmployee(id));
    }

    const handleEdit = (employee: {id: string; name: string; organizationId: string}) => {
        setSelectedEmployee(employee);
        setOpenModal(true);
    }

    const handleAdd = () => {
        setSelectedEmployee(undefined);
        setOpenModal(true);
    }

    return (
        <div className={classes.root}>
            <h1>Работники</h1>
            <Button component={Link} to={'/'} className={classes.button}>
                К организациям
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd} className={classes.button}>Добавить работника</Button>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                                    {employee.name}
                            </TableCell>
                            <TableCell>
                            <Button onClick={() => handleEdit(employee)} className={classes.button}>
                                    Редактировать
                                </Button>
                                <Button onClick={() => handleDelete(employee.id)} className={classes.button}>
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddEditEmployeeModal open={openModal} onClose={() => setOpenModal(false)} employee={selectedEmployee} organizationId={id!} />
        </div>
    )
}