import React, { useState } from 'react';
import { Response, useStore } from '../store/useStore';
import { FaAngleUp } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa'

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

    const deleteResponse = (index: number) => {
        useStore.setState(state => {
            const newResponses = [...state.responses];
            newResponses.splice(index, 1);
            return {
                responses: newResponses
            }
        })
    };

    return (
        <div className="mt-4 max-w-prose">
            {responses.map((response, index) => (
                <div key={index} className="mb-4" onClick={() => toggleResponse(index)}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">
                            {`${response.content.substring(0, 15)}${response.content.length > 15 ? '...' : ''}`}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <button
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                onClick={() => deleteResponse(index)}
                            >
                                <FaRegTrashAlt />
                            </button>
                            <FaAngleUp
                                className={`h-5 w-5 ${expandedResponses.includes(index) ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </div>
                    <div className={`mt-2 ${expandedResponses.includes(index) ? 'block' : 'hidden'}`}>
                        {response.content}
                    </div>
                </div>
            ))}
        </div>
    );
};