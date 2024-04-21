'use client'
import React, {useEffect, useState} from 'react';
import TableForData from "@/widgets/TableForData/ui/tableForData";
import DeleteCard from '../../../../shared/lib/graphQL/Query&Mutation/Cards/deleteCardMutation.graphql'
import {MRT_Cell, MRT_Column, MRT_ColumnDef, MRT_Row, MRT_RowData, MRT_TableInstance} from "material-react-table";
import EDIT_CARD from '../../../../../shared/lib/graphQL/Query&Mutation/Cards/editCardMutation.graphql'
import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";
import {TextFieldProps} from "@mui/material";
import useCardsStore from "@/entities/Card/model/store/AllCardsStore";
import {AllCardsI} from "@/entities/Card/model/type/type";
import {getCards} from "@/features/Administration/CardsManagement/model/servis/getCards";



const CardsManagement = () => {

    // const saveToDB = async (rowId: number, newValue: string | boolean | number, column: string) => {
    //     const client = makeClient()
    //
    //     const variables = {
    //         input: {
    //             id: rowId,
    //             [column]: newValue
    //         }
    //     };
    //
    //
    //     const {} = await client.mutate(({
    //         mutation: EDIT_CARD,
    //         variables: variables
    //     }))
    //
    // }
    // type CreateOnBlurHandlerParams = {
    //     cell: MRT_Cell<MRT_RowData>;
    //     column: MRT_Column<MRT_RowData>;
    //     row: MRT_Row<MRT_RowData>;
    //     table: MRT_TableInstance<MRT_RowData>;
    // };

    // const onBlurHandler = (column: string) => {
    //     return ({cell, row, table}: CreateOnBlurHandlerParams): TextFieldProps => ({
    //         onBlur: async (event: React.FocusEvent<HTMLInputElement>) => {
    //             const newValue = event.target.value;
    //             const rowId = Number(row.id);
    //             await saveToDB(rowId, newValue, column);
    //
    //         },
    //     });
    // };


    const cardsColumns: MRT_ColumnDef<AllCardsI>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableEditing: false,
        },
        {
            accessorKey: 'word',
            header: 'Word',
            // muiEditTextFieldProps: onBlurHandler('word')


        },
        {
            accessorKey: 'translation',
            header: 'Translation',
        },
        {
            accessorKey: 'example',
            header: 'Example',
        },
        {
            accessorKey: 'category',
            header: 'Category',
        },
        {
            accessorKey: 'difficulty',
            header: 'Difficulty',
        },
        {
            accessorKey: 'audio',
            header: 'Audio',
        },
        {
            accessorKey: 'image',
            header: 'Image',
        },
        {
            accessorKey: 'isFront',
            header: 'Is Front',
        },
    ]


    type IdType = string | number;

    const removeCardsFromCache = async (ids: IdType[]) => {
        console.log(`получены id ${ids}`)
        const client = makeClient();
        const stringIds: string[] = ids.map(id => String(id));
        console.log(`стринг id ${stringIds}`)
        stringIds.forEach(id => {
            client.cache.evict({id});
            client.cache.gc
        });

    };

    const [cards, setCards] = useState<AllCardsI[]>()
    const store = useCardsStore(state => state)

    useEffect(() => {

        const fetchData = async () => {

            const cardsFromQuery: AllCardsI[] = await getCards();
            store.setCards(cardsFromQuery);
            console.log(cardsFromQuery)

        };
        fetchData()

    }, []);
    const refreshData = async () => {
        const cardsFromQuery: AllCardsI[] = await getCards();
        store.setCards(cardsFromQuery);
    }


    return (
        <div>
            <button onClick={() => console.log(store.cards)}>обновить данные
            </button>
            {<TableForData columns={cardsColumns} data={store.cards} DELETE_MUTATION={DeleteCard} removeFromCash={removeCardsFromCache}/> }
        </div>

    );
};

export default CardsManagement;