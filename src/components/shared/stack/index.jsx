import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Stack = () => {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [stacks, setStacks] = useState([]);
    const [selectedStacks, setSelectedStacks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [filteredStacks, setFilteredStacks] = useState([]);

    useEffect(() => {
        const fetchStacks = async () => {
            try {
                // 임시 데이터
                const data = [
                    { id: 1, name: 'JavaScript', isSelected: true },
                    { id: 2, name: 'TypeScript', isSelected: false },
                    { id: 3, name: 'Python', isSelected: false },
                    { id: 4, name: 'Java', isSelected: false },
                    { id: 5, name: 'React', isSelected: true },
                    { id: 6, name: 'HTML / CSS', isSelected: false },
                    { id: 7, name: 'Node.js', isSelected: true },
                    { id: 8, name: 'Express', isSelected: false },
                    { id: 9, name: 'MongoDB', isSelected: true },
                    { id: 10, name: 'PostgreSQL', isSelected: false },
                    { id: 11, name: 'MySQL', isSelected: false },
                    { id: 12, name: 'GraphQL', isSelected: true },
                    { id: 13, name: 'Docker', isSelected: false },
                    { id: 14, name: 'Kubernetes', isSelected: false },
                    { id: 15, name: 'AWS', isSelected: true },
                    { id: 16, name: 'GCP', isSelected: false },
                    { id: 17, name: 'Azure', isSelected: false },
                    { id: 18, name: 'Git', isSelected: true },
                    { id: 19, name: 'GitHub', isSelected: false },
                    { id: 20, name: 'GitLab', isSelected: false },
                    { id: 21, name: 'Bitbucket', isSelected: true },
                    { id: 22, name: 'CI/CD', isSelected: false },
                    { id: 23, name: 'Jenkins', isSelected: false },
                    { id: 24, name: 'Webpack', isSelected: true },
                    { id: 25, name: 'Babel', isSelected: false },
                    { id: 26, name: 'ESLint', isSelected: false },
                    { id: 27, name: 'Prettier', isSelected: true },
                    { id: 28, name: 'Redux', isSelected: false },
                    { id: 29, name: 'MobX', isSelected: false },
                    { id: 30, name: 'Next.js', isSelected: true },
                ];

                setStacks(data);
                setSelectedStacks(data.filter((stack) => stack.isSelected));
            } catch (error) {
                console.error('Error fetching stacks:', error);
            }
        };

        fetchStacks();
    }, [id]);

    useEffect(() => {
        setFilteredStacks(stacks.filter((stack) => stack.name.toLowerCase().includes(searchKey.toLowerCase())));
    }, [searchKey, stacks]);

    const handleEdit = () => {
        if (isEdit) {
            const newSelectedStacks = stacks.filter((stack) => stack.isSelected);
            setSelectedStacks(newSelectedStacks);
        }
        setIsEdit(!isEdit);
    };

    const handleStackClick = (id) => {
        if (isEdit) {
            setStacks((prevStacks) =>
                prevStacks.map((stack) => (stack.id === id ? { ...stack, isSelected: !stack.isSelected } : stack))
            );
        }
    };

    const handleChooseClick = () => {
        setIsEdit(true);
    };

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    };

    const handleEditWithReset = () => {
        handleEdit();
        if (isEdit) {
            setSearchKey('');
        }
    };

    const StackTag = ({ name, isSelected, isEdit, onClick }) => {
        return (
            <span
                className={`mb-2 cursor-pointer rounded-8 px-10 py-3 text-16 text-white ${
                    isEdit ? (isSelected ? 'bg-blue' : 'bg-gray-db') : 'bg-blue'
                }`}
                onClick={isEdit ? onClick : null}
            >
                {name}
            </span>
        );
    };

    return (
        <div className='h-full w-full'>
            {selectedStacks.length > 0 || isEdit ? (
                <>
                    <div className='flex h-30 justify-between'>
                        <h1 className='text-20 font-bold leading-30'>Skills & Stacks</h1>
                        <button
                            type='button'
                            onClick={handleEditWithReset}
                            className='flex h-30 w-81 items-center justify-center rounded-16 bg-white px-14 py-6 shadow-custom-light'
                        >
                            <img src='/button/write.svg' alt='' />
                            <span className='ml-6 h-18 whitespace-nowrap text-14 text-gray-98'>
                                {isEdit ? 'save' : 'edit'}
                            </span>
                        </button>
                    </div>
                    {isEdit && (
                        <div className='mb-20 mt-10 flex h-32 w-full items-center justify-between rounded-8 bg-gray-fa px-12 shadow-custom-dark'>
                            <input
                                type='text'
                                placeholder='Search and find Skill & stack'
                                className='mr-4 flex-grow bg-gray-fa text-14 text-black placeholder:text-gray-98'
                                value={searchKey}
                                onChange={handleSearchChange}
                            />
                            <img src='/button/search.svg' className='h-25 w-25 cursor-pointer' />
                        </div>
                    )}
                    <div
                        className={`scrollbar-hide ${!isEdit ? 'mt-30 max-h-[calc(100%-60px)]' : 'mt-0 max-h-[calc(100%-80px)]'} flex flex-wrap gap-4 overflow-y-auto`}
                    >
                        {(isEdit ? filteredStacks : filteredStacks.filter((stack) => stack.isSelected)).map((stack) => (
                            <StackTag
                                key={stack.id}
                                name={stack.name}
                                isSelected={stack.isSelected}
                                isEdit={isEdit}
                                onClick={() => handleStackClick(stack.id)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className='flex h-full w-full flex-col items-center justify-center text-center'>
                    <h1 className='text-20 font-bold leading-30'>Choose your Skills & Stack</h1>
                    <button
                        className='mt-7 h-44 rounded-4 bg-primary p-10 text-16 font-bold text-white duration-200 hover:scale-105'
                        onClick={handleChooseClick}
                    >
                        Choose
                    </button>
                </div>
            )}
        </div>
    );
};

export default Stack;
