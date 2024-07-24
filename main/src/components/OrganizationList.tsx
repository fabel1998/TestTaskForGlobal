import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { deleteOrganization } from "../store/organizationSlice"; 
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AddEditOrganizationModal } from "./AddEditOrganizationModal";
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

export const OrganizationList = () => {
    const organizations = useSelector((state: RootState) => state.organizations.organizations);
    const dispatch: AppDispatch = useDispatch();
    const { classes } = useStyles();

    const [openModal, setOpenModal] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<{id: string; name: string} | undefined>(undefined);

    const handleDelete = (id: string) => {
        dispatch(deleteOrganization(id));
    }

    const handleEdit = (organization: {id: string; name: string}) => {
        setSelectedOrganization(organization);
        setOpenModal(true);
    }

    const handleAdd = () => {
        setSelectedOrganization(undefined);
        setOpenModal(true);
    }

    return (
        <div className={classes.root}>
            <h1>Организации</h1>
            <Button variant="contained" color="primary" onClick={handleAdd} className={classes.button}>Добавить организацию</Button>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizations.map((organization) => (
                        <TableRow key={organization.id}>
                            <TableCell>
                                    {organization.name}
                            </TableCell>
                            <TableCell>
                                <Button component={Link} to={`/organization/${organization.id}`} className={classes.button}>
                                    Посмотреть работников
                                </Button>
                                <Button onClick={() => handleEdit(organization)} className={classes.button}>
                                    Редактировать
                                </Button>
                                <Button onClick={() => handleDelete(organization.id)} className={classes.button}>
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AddEditOrganizationModal open={openModal} onClose={() => setOpenModal(false)} organization={selectedOrganization} />
        </div>
    )
}