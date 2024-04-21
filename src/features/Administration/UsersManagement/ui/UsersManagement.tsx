import React, {useEffect, useState} from 'react';

import TableForData from "@/widgets/TableForData/ui/tableForData";
import {MRT_ColumnDef} from "material-react-table";
import DeleteUser from '../../../../shared/lib/graphQL/Query&Mutation/Users/delUserMutation.graphql'
import {getUsers} from "@/features/Administration/UsersManagement/model/service/getUsers";
import {IUser} from "@/entities/User/model/type/type";
const UsersManagement = () => {

    const usersColumns :MRT_ColumnDef<IUser>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableEditing: false,
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'isActivated',
            header: 'IsActivated',
        },

        {
            accessorKey: 'banned',
            header: 'Banned',
        },
        {
            accessorKey: 'banReason',
            header: 'BanReason',
        },
        {
            accessorKey: 'lastLessonDate',
            header: 'LastLessonDate',
        },
        {
            accessorKey: 'newLimit',
            header: 'NewLimit',
        },
        {
            accessorKey: 'oldLimit',
            header: 'OldLimit',
        },
        {
            accessorKey: 'timeForCard',
            header: 'TimeForCard',
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
        },
    ]
    const [users, setUsers] = useState<IUser[]>()

    const removeUserFromCash = async ()=> {

    }

    useEffect(() => {
        const fetchUsers = async () => {
            const usersFromQuery: IUser[] = await getUsers()
            setUsers(usersFromQuery)
            console.log(usersFromQuery)
        }
        fetchUsers()
    }, []);


    return (
        <div>
            <button onClick={() => console.log(typeof users)}>check</button>
            {users ? <TableForData columns={usersColumns} data={users} DELETE_MUTATION={DeleteUser} removeFromCash={removeUserFromCash}/> : <div></div>}
        </div>
    );
};

export default UsersManagement;