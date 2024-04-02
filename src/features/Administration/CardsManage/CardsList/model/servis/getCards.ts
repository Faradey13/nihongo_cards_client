import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";
import GetAllCards from '../../../../../../shared/lib/graphQL/Query&Mutation/Cards/getAllCardsQuery.graphql'

export const getCards = async () => {
    const client = makeClient()
    const  {data } = await client.query({
        query: GetAllCards,
    })
   return data.getAllCards
}