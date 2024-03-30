import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {uploadCard} from "@/features/Administration/FilesUploader/model/service/filesService";
import {Card} from "@/features/Administration/FilesUploader/model/types/types";




const CreateCard = () => {

    const {handleSubmit, setValue, control, reset} = useForm<Card>()

    const onSubmit = async (card: Card) => {
        console.log(card.audio)
        console.log(card.image)
        await uploadCard(card)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Word:</label>
                <Controller
                    name='word'
                    control={control}
                    defaultValue={''}
                    render={({field}) => <input {...field}/>}
                />
            </div>
            <div>
                <label>Translation:</label>
                <Controller
                    name='translation'
                    control={control}
                    defaultValue={''}
                    render={({field}) => <input {...field}/>}
                />
            </div>
            <div>
                <label>Example:</label>
                <Controller
                    name='example'
                    control={control}
                    defaultValue={''}
                    render={({field}) => <input {...field}/>}
                />
            </div>
            <div>
                <label>Category:</label>
                <Controller
                    name='category'
                    control={control}
                    defaultValue={''}
                    render={({field}) => <input {...field}/>}
                />
            </div>
            <div>
                <label>Difficulty:</label>
                <Controller
                    name='difficulty'
                    control={control}
                    defaultValue={1}
                    render={({field}) => <input {...field}/>}
                />
            </div>
            <div>
                <label>Audio:</label>
                <Controller
                    name='audio'
                    control={control}
                    defaultValue={null}
                    render={(onChange) => (
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setValue('audio', file);
                            }}
                        />
                    )}
                />
            </div>
            <div>
                <label>Image:</label>
                <Controller
                    name='image'
                    control={control}
                    defaultValue={null}
                    render={(onChange) => (
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setValue('image', file);
                            }}
                        />
                    )}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default CreateCard;