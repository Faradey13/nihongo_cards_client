'use client'
import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import CREATE_ROLE_MUTATION  from '../../../../../shared/lib/graphQL/Query&Mutation/Roles/createRoleMutation.graphql'

interface RoleProps {
    value: string
    description: string
}
const initialRole = {
    value: '',
    description: ''
}

const CreateRole = () => {
    const [createRole, {data}] = useMutation(CREATE_ROLE_MUTATION)
    const [role, setRole] = useState<RoleProps>(initialRole)

    const handleCreateRole = async () => {
        await createRole({variables: {input: role }})
    }


    return (
        <div>
            <input
                value={role.value}
                placeholder={'название роли'}
                type="text"
                onChange={(event) => setRole({...role , value: event.target.value})}
            />
            <input
                value={role.description}
                placeholder={'описание'}
                type="text"
                onChange={(event) => setRole({...role, description: event.target.value})}
            />

            <button onClick={handleCreateRole}>создать роль</button>
            {data && <p>Роль {data.createRole.value} создана</p>}


        </div>
    );
};

export default CreateRole;