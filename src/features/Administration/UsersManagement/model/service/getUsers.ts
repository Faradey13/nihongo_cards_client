import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";
import GetAllUsers from '../../../../../shared/lib/graphQL/Query&Mutation/Users/getAllusersQuery.graphql'
import {IUser} from "@/entities/User/model/type/type";

export const getUsers = async () => {
    const client = makeClient()
    console.log('клиент готов')
    const {data} = await client.query({
        query: GetAllUsers
    })


 console.log(data)



    return data
}