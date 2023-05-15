import React, { useState } from 'react';
import { deleteResponse, openCustomVscodeEditor, Response, useStore } from '../store/useStore';
import { FaRegTrashAlt, FaAngleUp } from 'react-icons/fa';
import { RiCodeSSlashLine } from 'react-icons/ri'
import { LanguageId, LanguageSelect } from './LanguageSelect';

type ResponseContainerProps = {
    responses: Response[];
};

export const ResponseContainer: React.FC<ResponseContainerProps> = ({ responses }) => {
    const [expandedResponses, setExpandedResponses] = useState<number[]>([]);

    const toggleResponse = (index: number) => {
        if (expandedResponses.includes(index)) {
            setExpandedResponses(expandedResponses.filter((i) => i !== index));
        } else {
            setExpandedResponses([...expandedResponses, index]);
        }
    };

    const updateResponse = (lang: LanguageId, index: number) => {
        useStore.setState(state => {
            const newResponses = [...state.responses]
            newResponses[index].language = lang
            return { responses: newResponses }
        })
    }

    return (
        <div className="mt-4 w-full">
            {responses.map((response, index) => (
                <div key={index} className="mb-4 w-full">
                    <div className="flex justify-between items-center space-x-2" >
                        <FaAngleUp
                            className={`h-5 w-5 mr-2 ${expandedResponses.includes(index) ? 'rotate-180' : ''}`}
                        />
                        <h3 className="align-left flex-grow text-lg font-medium overflow-hidden whitespace-nowrap overflow-ellipsis" onClick={() => toggleResponse(index)}>
                            {response.prompt?.length ? response.prompt : response.content}
                        </h3>
                        <LanguageSelect value={response.language || `plaintext`} onChange={(lang) => updateResponse(lang, index)} />
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-gray-900 focus:outline-none" onClick={() => openCustomVscodeEditor(response.content, response.language)}>
                                <RiCodeSSlashLine className="h-4 w-4" />
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                onClick={() => deleteResponse(index)}
                            >
                                <FaRegTrashAlt className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className={`mt-2 ${expandedResponses.includes(index) ? "" : "hidden"}`}>
                        <pre className="language-javascript">
                            {response.content}
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    )
};