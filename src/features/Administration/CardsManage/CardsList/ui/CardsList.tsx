import React, {useEffect, useState} from 'react';
import {getCards} from "@/features/Administration/CardsManage/CardsList/model/servis/getCards";
import TableForData from "@/widgets/TableForData/ui/tableForData";
import DeleteCard from '../../../../../shared/lib/graphQL/Query&Mutation/Cards/deleteCardMutation.graphql'
import {MRT_Cell, MRT_Column, MRT_ColumnDef, MRT_Row, MRT_RowData, MRT_TableInstance} from "material-react-table";
import {useMutation} from "@apollo/client";
import EDIT_CARD from '../../../../../shared/lib/graphQL/Query&Mutation/Cards/editCardMutation.graphql'
import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";
import {TextFieldProps} from "@mui/material";
import useCardsStore from "@/entities/Card/model/store/AllCardsStore";

const CardsList = () => {

    const saveToDB = async (rowId: number, newValue: string | boolean | number, column: string) => {
        const client = makeClient()

        const variables = {
            input: {
                id: rowId,
                [column]: newValue
            }
        };



        const {} = await client.mutate(({
            mutation: EDIT_CARD,
            variables: variables
        }))

    }
    type CreateOnBlurHandlerParams = {
        cell: MRT_Cell<MRT_RowData, unknown>;
        column: MRT_Column<MRT_RowData, unknown>;
        row: MRT_Row<MRT_RowData>;
        table: MRT_TableInstance<MRT_RowData>;
    };

    const onBlurHandler = (column: string) => {
        return ({ cell, row, table }: CreateOnBlurHandlerParams): TextFieldProps => ({
            onBlur: async (event: React.FocusEvent<HTMLInputElement>) => {
                const newValue = event.target.value;
                const rowId = Number(row.id);
                await saveToDB(rowId, newValue, column);
                // Так как event.target.focus(); не соответствует типу TextFieldProps, его следует вызывать в другом месте
                // Возможно, после успешной обработки saveToDB, если это действительно необходимо
            },
        });
    };


    const cardsColumns: Array<MRT_ColumnDef<MRT_RowData>> = [
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
    const [card, setCard] = useState<MRT_RowData[]>()
    const store = useCardsStore(state => state)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCards = await getCards();
            store.setCards(fetchedCards);

        };

        fetchData();
    }, []);

    return (
        <div>
            <button onClick={() => {console.log(store.cards)}}>ggg</button>
            {<TableForData columns={cardsColumns} data={store.cards} DELETE_MUTATION={DeleteCard}/>}
        </div>

    );
};

export default CardsList;